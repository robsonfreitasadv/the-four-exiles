/**
 * Generative soundtrack, one theme per race plus a neutral Census theme.
 * Everything is synthesised with the Web Audio API: no audio files, no third-party rights.
 * A 16th-note scheduler looks ahead 120 ms so timing stays steady.
 */

export type ThemeId = 'census' | 'grays' | 'nordics' | 'reptilians' | 'mantis';

type Perc = 'click' | 'thump' | 'tick' | 'drum';

interface Theme {
  bpm: number;
  /** MIDI notes the melody picks from. */
  scale: number[];
  drone: { note: number; wave: OscillatorType; cutoff: number; gain: number };
  /** One chord per bar, cycling; empty for no pad. */
  pads: number[][];
  padWave: OscillatorType;
  arp: { wave: OscillatorType; probability: number; every: number; octave: number; fixed?: number[] };
  /** Percussion per 16th step within a 16-step bar. */
  perc: (step: number, bar: number) => Perc | null;
}

const THEMES: Record<ThemeId, Theme> = {
  census: {
    bpm: 84,
    scale: [60, 62, 64, 67, 69, 72],
    drone: { note: 48, wave: 'sine', cutoff: 600, gain: 0.05 },
    pads: [[60, 64, 67, 74], [57, 60, 64, 67], [53, 57, 60, 64], [55, 59, 62, 67]],
    padWave: 'triangle',
    arp: { wave: 'triangle', probability: 0.45, every: 2, octave: 12 },
    perc: (s) => (s === 0 ? 'thump' : s === 8 ? 'tick' : null),
  },
  grays: {
    bpm: 70,
    scale: [57, 60, 62, 64, 67, 69],
    drone: { note: 45, wave: 'sine', cutoff: 500, gain: 0.07 },
    pads: [],
    padWave: 'sine',
    arp: { wave: 'sine', probability: 0.3, every: 2, octave: 24 },
    // a rubber stamp every seven steps, across the bar line: the archival pause
    perc: (s, bar) => ((bar * 16 + s) % 7 === 0 ? 'click' : null),
  },
  nordics: {
    bpm: 76,
    scale: [65, 67, 69, 71, 72, 74, 76],
    drone: { note: 41, wave: 'triangle', cutoff: 700, gain: 0.04 },
    pads: [[65, 69, 72, 76], [67, 71, 74, 79], [69, 72, 76, 79], [64, 67, 71, 76]],
    padWave: 'sawtooth',
    arp: { wave: 'triangle', probability: 0.6, every: 2, octave: 12 },
    perc: () => null,
  },
  reptilians: {
    bpm: 64,
    scale: [52, 53, 55, 57, 59, 60, 62],
    drone: { note: 28, wave: 'sawtooth', cutoff: 260, gain: 0.06 },
    pads: [[52, 55, 59], [53, 57, 60], [50, 53, 57], [52, 55, 59]],
    padWave: 'sawtooth',
    arp: { wave: 'square', probability: 0.25, every: 4, octave: 0 },
    perc: (s) => (s === 0 || s === 10 ? 'drum' : s === 6 ? 'thump' : null),
  },
  mantis: {
    bpm: 112,
    scale: [62, 65, 67, 69, 72],
    drone: { note: 38, wave: 'square', cutoff: 380, gain: 0.03 },
    pads: [],
    padWave: 'square',
    arp: { wave: 'square', probability: 1, every: 1, octave: 0, fixed: [0, -1, 2, -1, 1, -1, 3, 2, 0, -1, 2, -1, 4, 3, 2, 1] },
    perc: (s) => (s % 4 === 0 ? 'thump' : s % 2 === 0 ? 'tick' : null),
  },
};

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export class Soundtrack {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private drone: { osc: OscillatorNode[]; gain: GainNode } | null = null;
  private theme: ThemeId = 'census';
  private timer: number | undefined;
  private nextTime = 0;
  private step = 0;
  private bar = 0;

  get playing() {
    return this.ctx !== null;
  }

  async start(theme: ThemeId) {
    if (this.ctx) return this.setTheme(theme);
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    await ctx.resume();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.master.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.5);
    const comp = ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(ctx.destination);
    this.noise = this.makeNoise(ctx);
    this.theme = theme;
    this.startDrone();
    this.nextTime = ctx.currentTime + 0.1;
    this.step = 0;
    this.bar = 0;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stop() {
    const ctx = this.ctx;
    if (!ctx || !this.master) return;
    window.clearInterval(this.timer);
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime);
    this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
    this.ctx = null;
    this.master = null;
    this.drone = null;
    window.setTimeout(() => void ctx.close(), 800);
  }

  setTheme(theme: ThemeId) {
    if (theme === this.theme || !this.ctx) {
      this.theme = theme;
      return;
    }
    this.theme = theme;
    this.stopDrone();
    this.startDrone();
  }

  private get t(): Theme {
    return THEMES[this.theme];
  }

  private makeNoise(ctx: AudioContext) {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }

  private startDrone() {
    const ctx = this.ctx!;
    const d = this.t.drone;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(d.gain, ctx.currentTime + 2);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = d.cutoff;
    filter.connect(gain).connect(this.master!);
    const osc = [0, 7].map((detune, i) => {
      const o = ctx.createOscillator();
      o.type = d.wave;
      o.frequency.value = hz(d.note + (i ? 12 : 0));
      o.detune.value = detune;
      o.connect(filter);
      o.start();
      return o;
    });
    this.drone = { osc, gain };
  }

  private stopDrone() {
    const ctx = this.ctx;
    const d = this.drone;
    if (!ctx || !d) return;
    d.gain.gain.cancelScheduledValues(ctx.currentTime);
    d.gain.gain.setValueAtTime(d.gain.gain.value, ctx.currentTime);
    d.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    d.osc.forEach((o) => o.stop(ctx.currentTime + 1.3));
    this.drone = null;
  }

  private schedule() {
    const ctx = this.ctx;
    if (!ctx) return;
    const sixteenth = 60 / this.t.bpm / 4;
    while (this.nextTime < ctx.currentTime + 0.12) {
      this.playStep(this.nextTime, sixteenth);
      this.nextTime += sixteenth;
      this.step = (this.step + 1) % 16;
      if (this.step === 0) this.bar++;
    }
  }

  private playStep(time: number, sixteenth: number) {
    const t = this.t;
    if (this.step === 0 && t.pads.length) this.pad(t.pads[this.bar % t.pads.length], time, sixteenth * 16);
    if (this.step % t.arp.every === 0) {
      let note: number | null = null;
      if (t.arp.fixed) {
        const idx = t.arp.fixed[this.step];
        note = idx < 0 ? null : t.scale[idx % t.scale.length];
      } else if (Math.random() < t.arp.probability) {
        note = t.scale[Math.floor(Math.random() * t.scale.length)];
      }
      if (note !== null) this.pluck(note + t.arp.octave, time, sixteenth * t.arp.every * 0.9, t.arp.wave);
    }
    const p = t.perc(this.step, this.bar);
    if (p) this.hit(p, time);
  }

  private pad(chord: number[], time: number, length: number) {
    const ctx = this.ctx!;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.025, time + length * 0.35);
    gain.gain.linearRampToValueAtTime(0, time + length * 1.1);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.connect(gain).connect(this.master!);
    for (const n of chord) {
      const o = ctx.createOscillator();
      o.type = this.t.padWave;
      o.frequency.value = hz(n);
      o.detune.value = (Math.random() - 0.5) * 10;
      o.connect(filter);
      o.start(time);
      o.stop(time + length * 1.15);
    }
  }

  private pluck(note: number, time: number, length: number, wave: OscillatorType) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = wave;
    o.frequency.value = hz(note);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(wave === 'square' ? 0.02 : 0.05, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + Math.max(length, 0.12));
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = wave === 'square' ? 1800 : 3000;
    o.connect(f).connect(g).connect(this.master!);
    o.start(time);
    o.stop(time + Math.max(length, 0.12) + 0.05);
  }

  private hit(kind: Perc, time: number) {
    const ctx = this.ctx!;
    if (kind === 'thump' || kind === 'drum') {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.setValueAtTime(kind === 'drum' ? 90 : 120, time);
      o.frequency.exponentialRampToValueAtTime(kind === 'drum' ? 40 : 55, time + 0.25);
      const g = ctx.createGain();
      g.gain.setValueAtTime(kind === 'drum' ? 0.35 : 0.18, time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + (kind === 'drum' ? 0.6 : 0.3));
      o.connect(g).connect(this.master!);
      o.start(time);
      o.stop(time + 0.7);
      return;
    }
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = kind === 'click' ? 2500 : 6000;
    f.Q.value = kind === 'click' ? 3 : 8;
    const g = ctx.createGain();
    g.gain.setValueAtTime(kind === 'click' ? 0.25 : 0.06, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + (kind === 'click' ? 0.08 : 0.03));
    src.connect(f).connect(g).connect(this.master!);
    src.start(time);
    src.stop(time + 0.1);
  }
}

export const soundtrack = new Soundtrack();

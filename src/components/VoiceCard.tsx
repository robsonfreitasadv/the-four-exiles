import { useEffect, useRef, useState } from 'react';
import { withBase } from './art/CharacterImage';
import { recordedVoices, voiceFile } from '../data/voiceFiles';
import { voices } from '../data/voices';
import { useI18n } from '../i18n/I18nProvider';

/**
 * A character introducing themselves: speech bubble with the line and, once the ElevenLabs
 * recording is in public/audio/voices, a play button. Without a recording the text still reads.
 */
export function VoiceCard({ id, color = '#e58a52', className = '' }: { id: string; color?: string; className?: string }) {
  const { t, l, lang } = useI18n();
  const voice = voices.find((v) => v.id === id);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const file = voiceFile(id, lang);
  const recorded = recordedVoices.includes(file);

  useEffect(() => {
    const a = audioRef.current;
    return () => a?.pause();
  }, [file]);

  if (!voice) return null;

  function toggle() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      a.currentTime = 0;
      setPlaying(false);
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <figure className={`flex gap-4 rounded-[28px] bg-graphite-800 p-5 sm:p-6 ${className}`}>
      <img
        src={withBase(`/images/characters/${id}-face.webp`)}
        alt=""
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-20 sm:w-20"
        style={{ boxShadow: `0 0 0 3px ${color}` }}
      />
      <div className="min-w-0 flex-1">
        <figcaption>
          <span className="font-display text-xl font-semibold text-bone">{voice.name}</span>
          <span className="ml-2 text-sm text-bone-muted">{l(voice.role)}</span>
        </figcaption>
        <blockquote className="mt-2 leading-relaxed text-bone-dim">“{l(voice.line)}”</blockquote>
        <div className="mt-4">
          {recorded ? (
            <>
              <audio ref={audioRef} src={withBase(`/audio/voices/${file}`)} preload="none" onEnded={() => setPlaying(false)} />
              <button type="button" onClick={toggle} className="btn-ghost px-4 py-2 text-sm" aria-pressed={playing}>
                {playing ? t.voice.stop : t.voice.listen.replace('{name}', voice.name)}
              </button>
            </>
          ) : (
            <span className="text-xs text-bone-muted">{t.voice.recording}</span>
          )}
        </div>
      </div>
    </figure>
  );
}

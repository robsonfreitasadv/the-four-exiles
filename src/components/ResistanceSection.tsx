import { dora, resistance } from '../data/resistance';
import { useI18n } from '../i18n/I18nProvider';
import { CharacterImage, withBase } from './art/CharacterImage';
import { Portrait } from './art/Portrait';
import { TiltCard } from './art/TiltCard';
import { TurnaroundViewer } from './art/TurnaroundViewer';
import { Reveal, SectionHeading } from './ui/primitives';
import { VoiceCard } from './VoiceCard';

const ORANGE = '#e58a52';

/** The human side: Dora's full sheet and her crew. */
export function ResistanceSection({ headingAs = 'h2' }: { headingAs?: 'h1' | 'h2' }) {
  const { t, l } = useI18n();
  const crew = resistance.slice(1);

  return (
    <section className="py-20 md:py-28" aria-label={t.resistance.title}>
      <div className="container-x">
        <SectionHeading as={headingAs} center kicker={t.resistance.kicker} title={t.resistance.title} intro={t.resistance.intro} />

        {/* rooftop banner */}
        <Reveal className="relative mb-6 aspect-[514/178] overflow-hidden rounded-[36px]">
          <img
            src={withBase('/images/characters/resistance-team.webp')}
            alt={t.resistance.teamAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>

        {/* Dora */}
        <div className="overflow-hidden rounded-[36px]" style={{ background: 'radial-gradient(120% 90% at 30% 10%, #3a2418 0%, #0b0b0d 70%)' }}>
          <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1fr_0.75fr_1.05fr] lg:gap-8 lg:p-12">
            <TiltCard className="overflow-hidden rounded-[28px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]" max={8}>
              <div className="relative aspect-[258/620] max-h-[640px] w-full">
                <CharacterImage
                  image={dora.image}
                  background="#1d140f"
                  fallback={<Portrait character="dora" alt={l(dora.image.alt)} className="absolute inset-x-0 bottom-0 h-[92%] w-full" />}
                />
              </div>
            </TiltCard>

            {dora.sheet && <TurnaroundViewer frames={dora.sheet.turnaround} name={dora.name} color={ORANGE} />}

            <div className="min-w-0">
              <p className="text-sm font-semibold" style={{ color: ORANGE }}>
                {l(dora.role)}
              </p>
              <h3 className="display mt-1 text-[48px]">{dora.name}</h3>
              <blockquote className="mt-3 text-2xl font-semibold leading-snug tracking-[-0.02em]">“{l(dora.quote)}”</blockquote>
              {dora.bio && <p className="mt-4 text-bone-dim">{l(dora.bio)}</p>}
              <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5 text-sm">
                {dora.facts?.map((fact) => (
                  <div key={fact.label.en}>
                    <dt className="text-bone-muted">{l(fact.label)}</dt>
                    <dd className="mt-1">{l(fact.value)}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {(
                  [
                    [t.resistance.skills, dora.skills],
                    [t.resistance.personality, dora.personality],
                  ] as const
                ).map(([label, items]) => (
                  <div key={label}>
                    <h4 className="text-xs font-semibold text-bone-muted">{label}</h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {items?.map((s) => (
                        <li key={s.en} className="rounded-full bg-[#e58a52]/15 px-3 py-1 text-sm text-[#f3c4a3]">
                          {l(s)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {dora.sheet && (
                <ul className="mt-6 grid grid-cols-6 gap-2">
                  {dora.sheet.expressions.map((src) => (
                    <li key={src} className="aspect-[102/124] overflow-hidden rounded-xl bg-black/40">
                      <img src={withBase(src)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-110 motion-reduce:transition-none" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* crew */}
        <h3 className="display mb-6 mt-14 text-center text-[32px]">{t.resistance.team}</h3>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {crew.map((h) => (
            <Reveal as="li" key={h.id}>
              <TiltCard className="overflow-hidden rounded-[28px] bg-graphite-800" max={9}>
                <div className="relative aspect-[3/4]">
                  <CharacterImage image={h.image} background="#151515" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-xs font-semibold" style={{ color: ORANGE }}>
                      {l(h.role)}
                    </p>
                    <p className="display text-2xl sm:text-3xl">{h.name}</p>
                    <p className="mt-1 text-sm text-bone/80">“{l(h.quote)}”</p>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
        <h3 className="display mb-6 mt-16 text-3xl sm:text-4xl">{t.voice.resistanceTitle}</h3>
        <div className="grid gap-4 lg:grid-cols-2">
          {['dora', 'rui', 'livia', 'julio', 'tati'].map((id) => (
            <VoiceCard key={id} id={id} color={ORANGE} className={id === 'dora' ? 'lg:col-span-2' : ''} />
          ))}
        </div>
        <p className="mt-10 text-center text-xl font-semibold tracking-[-0.02em] text-bone-dim">{t.resistance.tagline}</p>
      </div>
    </section>
  );
}

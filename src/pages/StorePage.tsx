import { Emblem } from '../components/art/Emblem';
import { withBase } from '../components/art/CharacterImage';
import { SectionHeading } from '../components/ui/primitives';
import { factionById } from '../data/factions';
import { productUrl, products } from '../data/store';
import { useI18n } from '../i18n/I18nProvider';

const ORANGE = '#e58a52';

/** Store front: one printed-on-demand product per race and one for the Resistance. */
export function StorePage() {
  const { t, l } = useI18n();

  return (
    <div className="container-x py-14 md:py-20">
      <SectionHeading as="h1" kicker={t.store.kicker} title={t.store.title} intro={t.store.intro} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => {
          const f = p.owner === 'resistance' ? undefined : factionById(p.owner);
          const color = f?.palette.primary ?? ORANGE;
          const href = productUrl(p);
          return (
            <li key={p.slug} className="flex flex-col overflow-hidden rounded-[32px] bg-graphite-800">
              <div className="grid aspect-square place-items-center bg-[#141416] p-6">
                <img src={withBase(p.image)} alt={l(p.name)} loading="lazy" className="max-h-full max-w-full rounded-xl object-contain" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-2 text-sm font-semibold" style={{ color }}>
                  {f && <Emblem faction={f.id} className="h-4 w-4" />}
                  {f ? l(f.name) : t.store.resistance} · {l(p.kind)}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-bone">{l(p.name)}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-bone-dim">{l(p.description)}</p>
                <div className="mt-6">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      {t.store.buy}
                    </a>
                  ) : (
                    <span className="inline-flex rounded-full border border-bone/20 px-4 py-2 text-sm text-bone-muted">{t.store.soon}</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-10 max-w-2xl text-sm text-bone-muted">{t.store.note}</p>
    </div>
  );
}

import type { Dictionary } from '../../i18n/en';

type NavKey = keyof Dictionary['nav'];

/** Global navigation, in display order. Labels come from the `nav` dictionary. */
export const primaryNav: { to: string; key: NavKey }[] = [
  { to: '/', key: 'home' },
  { to: '/choose', key: 'choose' },
  { to: '/factions', key: 'factions' },
  { to: '/lore', key: 'lore' },
  { to: '/galactic-war', key: 'galacticWar' },
  { to: '/missions', key: 'missions' },
  { to: '/store', key: 'store' },
  { to: '/transparency', key: 'transparency' },
];

export const secondaryNav: { to: string; key: NavKey }[] = [
  { to: '/season-0', key: 'season0' },
  { to: '/characters', key: 'characters' },
  { to: '/grays', key: 'grays' },
  { to: '/nordics', key: 'nordics' },
  { to: '/reptilians', key: 'reptilians' },
  { to: '/mantis', key: 'mantis' },
  { to: '/collectibles', key: 'collectibles' },
  { to: '/market', key: 'market' },
  { to: '/privacy', key: 'privacy' },
  { to: '/terms', key: 'terms' },
];

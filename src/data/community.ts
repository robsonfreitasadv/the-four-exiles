import type { FactionId } from './types';

/**
 * Community links (Discord). Paste the invite once the server exists; see docs/COMUNIDADE.md.
 * While inviteUrl is empty the site shows the channel names with a "coming soon" label.
 */

export const community = {
  platform: 'Discord',
  /** Server invite that never expires, e.g. https://discord.gg/xxxx */
  inviteUrl: '',
  races: {
    grays: { channel: '#cartório-de-hevra', url: '' },
    nordics: { channel: '#salão-da-assembleia', url: '' },
    reptilians: { channel: '#corte-das-cisternas', url: '' },
    mantis: { channel: '#sala-de-guerra', url: '' },
  } satisfies Record<FactionId, { channel: string; url: string }>,
};

/** Only http(s) links are used, so a typo in the config can never become a script URL. */
function safe(url: string): string | undefined {
  return /^https:\/\/\S+$/.test(url) ? url : undefined;
}

export function communityLink(race?: FactionId): string | undefined {
  return (race && safe(community.races[race].url)) || safe(community.inviteUrl);
}

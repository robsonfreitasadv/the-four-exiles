import type { Localized } from './types';

/**
 * Who answers for the site under the LGPD. Fill before launch; while empty the pages say "to be defined".
 * Kept out of the policy text so a change here updates both languages.
 */
export const legal = {
  /** Controller: person or company responsible for the site (name, and CPF/CNPJ if desired). */
  controller: '',
  /** Contact for privacy requests and the terms (also acts as the data protection contact). */
  contactEmail: '',
  /** Hosting provider, once chosen (e.g. Cloudflare Pages). */
  hosting: '',
  lastUpdated: '2026-10-22',
};

export const toBeDefined: Localized = { en: 'to be defined before launch', 'pt-BR': 'a definir antes do lançamento' };

/** Keys this site writes to localStorage; the privacy page can erase them. */
export const localStorageKeys = ['four-exiles:lang', 'tfe.census', 'four-exiles:accepted-missions', 'four-exiles:sound'];

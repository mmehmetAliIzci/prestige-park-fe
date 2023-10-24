export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'th'],
} as const;

export const defaultLocale = i18n.defaultLocale;
export type Locale = (typeof i18n)['locales'][number];

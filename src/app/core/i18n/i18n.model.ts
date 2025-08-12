export type Lang = 'ru' | 'en' | 'es' | 'de';

export const LANG_NAMES: Record<string,string> = {
  en: 'English', es: 'Spanish', ru: 'Русский', de: 'Deutsch'
};

export const SUPPORTED_LANGS: Lang[] = ['en', 'ru', 'es', 'de'];
export const DEFAULT_LANG: Lang = 'en';
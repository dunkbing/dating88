import i18next from "i18next";
import enTranslations from "@/locales/en/translations.json" assert {
  type: "json",
};
import vnTranslations from "@/locales/vn/translations.json" assert {
  type: "json",
};

const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale;

i18next.init({
  lng: "en",
  fallbackLng: "vi",
  resources: {
    en: {
      translation: enTranslations,
    },
    vi: {
      translation: vnTranslations,
    },
  },
});

const i18n = (lng?: string) => i18next.getFixedT(lng || systemLocale);

export default i18n;

export const lang = i18n();

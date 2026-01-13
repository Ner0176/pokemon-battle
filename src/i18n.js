import i18n from "i18next";
import es from "../src/assets/locales/es.json";
import en from "../src/assets/locales/en.json";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  supportedLngs: ["es", "en"],
  interpolation: {
    escapeValue: false,
  },
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
});

export default i18n;

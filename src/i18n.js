import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import hubEN from "./locales/en/hub.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      hub: hubEN,
    },
  },
  defaultNS: "hub",
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  react: {
    bindI18n: "languageChanged",
    bindI18nStore: "",
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "strong", "i"],
    useSuspense: true,
  },
});

export default i18n;

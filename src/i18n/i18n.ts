import { initReactI18next } from "react-i18next";
import i18n, { TOptionsBase } from "i18next";

import { en, ja } from "./index";
import { languageDetectorPlugin } from "./languageDetectorPlugin";

type LANGUAGE_TYPE = "en" | "ja";
const DEFAULT_LANGUAGE: LANGUAGE_TYPE = "en"

const resources = {
  en: {
    translation: en
  },
  ja: {
    translation: ja
  }
};

i18n
.use(initReactI18next)
.use(languageDetectorPlugin)
.init({
  resources,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false
  }
});


const translate = (key: string | string[], options?: TOptionsBase | string): string => {
  return i18n.t(key, options) as string;
};

export {
  DEFAULT_LANGUAGE,
  i18n,
  type LANGUAGE_TYPE,
  translate}


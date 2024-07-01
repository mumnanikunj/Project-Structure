import AsyncStorage from "@react-native-async-storage/async-storage";

import { debugLog } from "../functions/commonFunctions";
import { DEFAULT_LANGUAGE, i18n,LANGUAGE_TYPE } from "./i18n";

const STORE_LANGUAGE_KEY = "settings.lang";

export const languageDetectorPlugin = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async function (callback: (lang: string) => void) {
    try {
      await AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
        debugLog("Cached Language--- ", language)
        if (language) {
          global.language = language
          return callback(language);
        } else {
          global.language = DEFAULT_LANGUAGE
          return callback(DEFAULT_LANGUAGE);
        }
      });
    } catch (error) {
      debugLog("Error reading language", error);
    }
  },
  cacheUserLanguage: async function (language: LANGUAGE_TYPE) {
    try {
      i18n.changeLanguage(language);
      global.language = language
      await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
    } catch (error) {}
  }
};

module.exports = { languageDetectorPlugin };
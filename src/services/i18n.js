import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import format from "./i18n-format";
import total from "../components/Shop";
import English from '../translations/en.json';
import Arabic from '../translations/ar.json';

import {
  defaultLanguage,
  supportedLanguages,
} from "../config/i18n";

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({

    supportedLngs: supportedLanguages.map(
      (lang) => lang.code,
    ),

    

    nonExplicitSupportedLngs: true,

    fallbackLng: defaultLanguage,

    interpolation: {
      // React will escape output values, so we don't need
      // i18next to do it.
      lng: 'en',                              // language to use
        resources: {
            en: {
                english: English               // 'common' is our custom namespace
            },
            de: {
                arabic: Arabic
            },
        },

      // format: function (value, format) {
      //   if (format === "costs") {
      //     return new Intl.NumberFormat('ar-EG', {style: 'currency', currency: 'EUR'}).format(value);
      //   }
      //   if (format === "costs1") {
      //     return new Intl.NumberFormat('EN-us', {style: 'currency', currency: 'USD'}).format(value);
      //   }
      //   return value;
      // },
    
    
      escapeValue: false,
      format,
      total,
      
    },
    
    debug: process.env.NODE_ENV === "development",
  });

export default i18next;

export function languageCodeOnly(fullyQualifiedCode) {
  return fullyQualifiedCode.split("-")[0];
}

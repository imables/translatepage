import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

function format(value, format, lang ) {
  if (format.startsWith("date")) {
    return formatDate(value, format, lang);
  }

  if (format.startsWith("number")) {
    return formatNumber(value, format, lang);
  }

  if (format === "costs") {
    return new Intl.NumberFormat('ar-EG', {style: 'currency', currency: 'AED'}).format(value);
  }
  if (format === "costs1") {
    return new Intl.NumberFormat('EN-us', {style: 'currency', currency: 'USD'}).format(value);
  }
  return value;

  

  // if (format.startsWith("costs")) {
  //   return formatNumber1(value , lang)
  // }

  // if (format.startsWith("costs")) {
  //   return formatNumber1(value , lang)
  // }


}


function formatDate(value, format, lang) {
  const options = toOptions(format, "date");

  return options === null
    ? value
    : new Intl.DateTimeFormat(lang, options).format(value);
}

function formatNumber(value, format, lang ) {
  const options = toOptions(format, "number");

  
  return options === null
    ? value
    : new Intl.NumberFormat(lang, options ).format(value);

}


// function formatNumber1(value, format, lang) {
//   const options = (format, "costs");

//   return options === null
//     ? value
//   :new Intl.NumberFormat( lang, {style: 'currency', currency: 'USD'} ).format(value);
// }



function toOptions(format, specifier) {
  if (format.trim() === specifier) {
    return {};
  } else {
    try {
      return JSON.parse(toJsonString(format, specifier));
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

function toJsonString(format, specifier) {
  const inner = format
    .trim()
    .replace(specifier, "")
    .replace("(", "")
    .replace(")", "")
    .split(";")
    .map((param) =>
      param
        .split(":")
        .map((name) => `"${name.trim()}"`)
        .join(":"),
    )
    .join(",");

  return "{" + inner + "}";
}

export default format;

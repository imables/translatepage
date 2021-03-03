function format(value, format, lang ) {
  if (format.startsWith("date")) {
    return formatDate(value, format, lang);
  }

  if (format.startsWith("number")) {
    return formatNumber(value, format, lang);
  }

  

  if (format.startsWith("costs")) {
    return formatNumber1(value , lang)
  }

  return value;
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

function formatNumber1(value,  lang) {
  const options = (format, "cost");

  return options === null
    ? value
  :new Intl.NumberFormat( lang, {style: 'currency', currency: 'USD'} ).format(value);

}

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

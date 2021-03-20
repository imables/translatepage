import React from "react";
import { useTranslation } from "react-i18next";


function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <div className="select">
      <select className="dropdown is-active dropdown-trigger button"
        value={i18n.language}
        onChange={(e) =>
          i18n.changeLanguage(e.target.value)
        }
      >
        <option value="en-US">English</option>
        <option value="ar-EG">عربي</option>
      </select>
    </div>
  );
}
export default LanguageSwitcher;
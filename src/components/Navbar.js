import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../logo.png";
import LanguageSwitcher from "./LanguageSwitcher";

function Navbar({ onLanguageChange }) {
  const { t } = useTranslation();

  const user = { firstName: "Jakob", lastName: "Ripley" };

  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img
            className="navbar-logo"
            src={logo}
            alt="logo"
          />

          <strong>{t("app_name")}</strong>
        </a>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/">
            {t("weekly_basket")}
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/Shop">
              {t("Checkout")}
            </a>
            <a className="navbar-item" href="/WeeklyAvailable">
              {t("weekly_available")}
            </a>
          </div>
        </div>

        {/* <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/WeeklyAvailable">
              {t("weekly_available")}
            </a>
          </div>
        </div> */}

        <div className="navbar-end">
          <div className="navbar-item">
            <p>{t("hello_user", { user })}</p>
          </div>

          <div className="navbar-item ">
            <LanguageSwitcher onChange={onLanguageChange} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
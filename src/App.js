import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WeeklyBasket from "./components/WeeklyBasket";
import Shop from './components/Shop';
import "./App.scss";
import {BrowserRouter, Route} from 'react-router-dom' 

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;

    document.title = i18n.t("document_title");
  }, [i18n, i18n.language]);

  return (
    <BrowserRouter>
    <>
      <Navbar
        onLanguageChange={(lang) =>
          i18n.changeLanguage(lang)
        }
      />

      <main role="main" className="pt-5 px-3">
        <Header />
        <Route exact path='/' component={WeeklyBasket} />
        <Route exact path='/Shop' component={Shop} />
      </main>

      <Footer />
    </>
    </BrowserRouter>
  );
}

export default App;

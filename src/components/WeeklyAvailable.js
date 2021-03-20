import React, { useState, useEffect } from "react";
import Available from "./Available";
import { useTranslation } from "react-i18next";
import { languageCodeOnly } from "../services/i18n";


function WeeklyAvailable() {
    const { i18n } = useTranslation();
    const [available, setAvailable] = useState([]);

useEffect(() => {
    fetch(`/bask/${languageCodeOnly(i18n.language)}.json`)
      .then((response) => response.json())
      .then((json) => setAvailable(json));
  }, [i18n.language]);
  
    if (available.length === 0) {
      return <p>Loading...</p>;
    } else {
      return (
        <div className="columns is-multiline">
          {available.map((av) => (
            <Available key={av.id} {...av} />
          ))}
        </div>
      );
    }
}

export default WeeklyAvailable;
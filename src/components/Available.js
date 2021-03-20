import React from "react";
import { useTranslation } from "react-i18next";


function Available({
        title,
        imageUrl,
        description,
        price,
      }) {
        const { t } = useTranslation();
      
        return (
          <div className="column is-one-third">
            <div className="card">
              <div className="card-image">
                <figure className="image">
                  <img src={imageUrl} alt={title} />
                </figure>
              </div>
      
              <div className="card-content">
                <p className="title is-5 mb-2">{title}</p>
      
                <div className="content">
                  <p className="mb-1">{description}</p>
      
                  <p>
                    <span className="tag is-light is-medium">
                      {t("estimated_weight")}
                    </span>{" "}
                    {t("estimated_weight_kg", {
                      weight: price,
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
      

export default Available;
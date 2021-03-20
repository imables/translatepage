import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ShopCosts({
    price, name, overall
}) {
    const { t } = useTranslation();
    
    return (
        <div className="card">
        <div className="card-content">
        <p className="mb-1 content">{name}</p>
        <div className="card"> 
        <div className="card-content">
        <div className="content">
            {t("list_item", "cart_item", {
                cost:  price, name, overall
              })}
              
              </div>
        </div>
        </div>
        </div>
        </div>
    )
}

export default ShopCosts;
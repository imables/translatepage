import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ShopCosts({
    price, name, 
}) {
    const { t } = useTranslation();
    
    return (
        <div>
        <p>{name}</p>
        <div> 
            
            {t("list_item", {
                cost:  price,
              })}
        </div>
        
        </div>
    )
}

export default ShopCosts;
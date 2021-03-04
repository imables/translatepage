import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function ShopCosts({
    price, name, cartTotal
}) {
    const { t } = useTranslation();
    
    return (
        <div>
        <p>{name}</p>
        <div> 
            
            {t("list_item", "cart_item", "total_item", {
                cost:  price, name,cartTotal
              })}
              
        </div>
            <div>
        
            
        </div>
        
        
        
        </div>
    )
}

export default ShopCosts;
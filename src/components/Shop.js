import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { languageCodeOnly, lng } from "../services/i18n";
import ShopCosts from "./ShopCosts";


import {
    defaultLanguage,
    supportedLanguages,
  } from "../config/i18n";

  

function Shop  ({
    price
})  {


    const { t, i18n } = useTranslation();
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [alert, setAlert] = useState('');
    const [cartTotal, setCartTotal] = useState(0);


    useEffect(() => {
        fetch(`/shopData/${languageCodeOnly(i18n.language)}.json`)
        .then((response) => response.json())
        .then((json) => setItems(json));
    }, [i18n.language]);
    console.log(i18n.language, "hello")

    
    useEffect(
        () => {
            total()
        }, [cart]
    )


    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price
        }
        setCartTotal(totalVal)
        
    }

    const addToCart = (el) => {
        let addIt = true 
        for(let i = 0; i < cart.length; i++){
            if(cart[i].id === el.id) addIt = false
        }
        if (addIt) {
            setCart([...cart, el])
            setAlert('');
        }
            else setAlert(`${el.name}` + t("error_message"));
    }; 

    const removeFromCart = (el) => {
        let hardCopy = [...cart]
        hardCopy = hardCopy.filter(cartItem => cartItem.id !== el.id)
            setCart(hardCopy)
            setAlert('');
    }

    // const listItems = items.map(el => (
    //     <div> <ShopCosts key={el.id} />
    //         {`${el.name}: $${el.price}`}
    //         <input type='submit' value='add' onClick={() => addToCart(el)} />
    //     </div>
    // ))

    // const cartItems = cart.map(el => (
    //     <div> <ShopCosts key={el.id} />
    //         {`${el.name}:$${el.price}`}
    //         <input type='submit' value='remove' onClick={() => removeFromCart(el)} />
    //     </div>
    // ))

    const display = items.map(el => ( 
        <div>
        <input type='submit' value='add' onClick={() => addToCart(el)} />
      </div>
    ))

    const remove = cart.map(el => ( 
        <div>
        <input type='submit' value='remove' onClick={() => removeFromCart(el)} />
      </div>
    ))

    console.log(supportedLanguages[0].type, i18n.language, "oioi")

    if (items.length === 0) {
        return <p>Loading...</p>;
      } else {
        return (
            <div>
                <div>
                    {items.map((el) => (
                    <ShopCosts key={el.id} {...el}/>
                    ))}
                </div>
                <div>{display}</div>
                <div>{t("cart")}</div>
                <div>{cart.map((el) => (
                    <ShopCosts key={el.id} {...el}/>
                    ))}</div>
                    <div>{remove}</div>
                <div>
                {t("total")}: {(() => {
                    if (supportedLanguages[0].type === i18n.language) {
                        return <div>${cartTotal}</div>
                    } else {
                        return<div>د.إ{cartTotal}</div>
                    }
                })()}
                
                </div>
                <div>{t("alert")}: {alert}</div>
            </div>
        );
      }

};

export default Shop;
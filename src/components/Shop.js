import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { languageCodeOnly, lng } from "../services/i18n";
import ShopCosts from "./ShopCosts";


import {
    defaultLanguage,
    supportedLanguages,
  } from "../config/i18n";

  

function Shop  ({

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
            console.log(cart.length, "mrman");
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

    const add = items.map(el => ( 
        <div>
        <input className="button mt-2 mb-2" type='submit' value='add' onClick={() => addToCart(el)} />
      </div>
    ))

    const remove = cart.map(el => ( 
        <div>
        <input className="button mt-2 mb-2" type='submit' value='remove' onClick={() => removeFromCart(el)} />
      </div>
    ))

    // function translateTotal ()  {
    //   if (supportedLanguages[0].type === "en") {
    //     return "en-US" 
    //   } else if (supportedLanguages[1].type === "ar"){
    //     return "ar-EG" 
    //   }
    // }
    
    const overall = cartTotal;

    
    console.log(supportedLanguages[1].type)
    

    if (items.length === 0) {
        return <p>Loading...</p>;
      } else {
        return (
            <div>
                <div>
                    {items.map((el) => (
                    <ShopCosts key={el.id} {...el} />
                    
                    ))}
                    <div>{add}</div>
                </div>
                <div className="card card-content content has-background-primary-light mt-2">{t("cart")}</div>
                <div >{cart.map((el) => (
                    <ShopCosts key={el.id} {...el}/>
                    ))}</div>
                    <div>{remove}</div>
                
                 {/* {t("total")}: {(() => {
                    if (i18n.language === supportedLanguages[0].type) {
                        console.log(translateTotal());
                        return <div className="card card-content content">£{cartTotal}</div>
                    } else if (supportedLanguages[1].type){
                        return<div>د.إ{overall}</div>
                    }
                    })() }  */}
                    <p>{t("total", { totals: (cartTotal)})}</p>

                <div>{t("alert")}: {alert}</div>
            </div>
        );
      }
};

export default Shop;
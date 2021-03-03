import React, {useState, useEffect} from 'react';
import { useTranslation } from "react-i18next";
import { languageCodeOnly } from "../services/i18n";
import ShopCosts from "./ShopCosts";


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
    //         <input type='submit' value='remove' onClick={() => addToCart(el)} />
    //     </div>
    // ))

    const cartItems = cart.map(el => (
        <div> <ShopCosts key={el.id} />
            {`${el.name}: $${el.price}`}
            <input type='submit' value='remove' onClick={() => removeFromCart(el)} />
        </div>
    ))

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
                <div>{t("cart")}</div>
                <div>{cartItems}</div>
                <div>{t("total")}:${cartTotal}</div>
                <div>{t("alert")}: {alert}</div>
            </div>
        );
      }

};

export default Shop;
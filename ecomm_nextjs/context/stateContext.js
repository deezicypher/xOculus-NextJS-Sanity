import React,{createContext, useContext, useState, useEffect} from "react";
import {toast} from 'react-hot-toast';
import Cookies from 'js-cookie';
import { client } from "../utils/client";



const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState(
        Cookies.get('cartItems')? JSON.parse(Cookies.get('cartItems')) : []
    );
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const removeFromCart = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id);
        const newCartItems = cartItems.filter(item => item._id !== product._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.quantity * foundProduct.price);
        setTotalQuantities(prevTotalQty => prevTotalQty - foundProduct.quantity);
        setCartItems(newCartItems)
    }

    const updateCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find( item => item._id === id )
        index = cartItems.findIndex(item => item._id === id)
        const newCartItems = cartItems.filter( item => item._id !== id);

        if(value === 'inc'){
            setCartItems([...newCartItems,{...foundProduct, quantity: foundProduct.quantity += 1 }])
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQty => prevTotalQty + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
            setCartItems([...newCartItems,{...foundProduct, quantity: foundProduct.quantity -= 1 }])
            setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQty => prevTotalQty - 1)
        }
    }
    }



    const incQty = () => {
        setQty(prevQty => prevQty + 1)
    }
    const decQty = () => {
        setQty(prevQty => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1
        }
        )
    }

    const productInfo = async (id) => {
        const query = `*[_type == 'product' &&  _id == '${id}'] [0]`
        const product = await client.fetch(query)
        console.log(product.slug, product.stock)

    }
    
    const onAdd = (qty, product) => {
        
        const checkProductInCart = cartItems.find(item => item._id === product._id)
 
      
       {/* if (checkProductInCart){
            setTotalPrice(prevTotalPrice => prevTotalPrice + qty * product.price);
            setTotalQuantities(prevTotalQty => prevTotalQty + qty)

            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + qty
                }
            })
            Cookies.set('cartItems',updatedCartItems,{ expires: 1 })
            setCartItems(updatedCartItems)
            
        }else{
            setTotalPrice(prevTotalPrice => prevTotalPrice + qty * product.price);
            setTotalQuantities(prevTotalQty => prevTotalQty + qty)
            product.quantity = qty
            
            setCartItems([...cartItems, {...product}])
        }
        */}
        toast.success(`${qty} ${product.name} added to cart`) 
    }

    return (
        <Context.Provider
            value={{
                showCart,
                showSearch,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                setShowSearch,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                setShowCart,
                updateCartItemQuantity,
                removeFromCart
            }}
        >
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)
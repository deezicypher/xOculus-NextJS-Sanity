import React,{createContext, useContext, useState, useEffect} from "react";
import {toast} from 'react-hot-toast';
import { client } from "../utils/client";




const Context = createContext();

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    const [stock, setStock] = useState();


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
        if(foundProduct.quantity < stock){
            const updatedCartItems = [...newCartItems,{...foundProduct, quantity: foundProduct.quantity += 1 }]
            setCartItems(updatedCartItems)
            setTotalPrice(prevTotalPrice => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQty => prevTotalQty + 1)
        }
        }else if(value === 'dec'){
           
            if(foundProduct.quantity > 1){
            const updatedCartItems = [...newCartItems,{...foundProduct, quantity: foundProduct.quantity -= 1 }]
            setCartItems(updatedCartItems)
            setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQty => prevTotalQty - 1)
   
        }
    }
    }



    const incQty = () => {
        if(qty < stock){
        setQty(prevQty => prevQty + 1)
        }
    }
    const decQty = () => {
        setQty(prevQty => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1
        }
        )
    }

 
    
    const onAdd = (qty, product) => {
       
        
        const checkProductInCart = cartItems.find(item => item._id === product._id)
        
     
        if (checkProductInCart){
          
            setTotalPrice(prevTotalPrice => prevTotalPrice + qty * product.price);
            setTotalQuantities(prevTotalQty => prevTotalQty + qty)

            const updatedCartItems = cartItems.map(cartProduct => {
                if(cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + qty
                }
            })
            setCartItems(updatedCartItems);
            
            
        }else{
            const newPrice = totalPrice + qty * product.price
            setTotalPrice(prevTotalPrice => prevTotalPrice + qty * product.price);
            setTotalQuantities(prevTotalQty => prevTotalQty + qty)
            product.quantity = qty
            setCartItems([...cartItems, {...product}])
  

           
        }
        

        toast.success(`${qty} ${product.name} added to cart`) 
  
    }

    const stockInfo = async (id) => {
        const query = `*[_type == 'product' &&  _id == '${id}'] [0]`
        const product = await client.fetch(query)
       setStock(product.stock)
    }
 
    return (
        <Context.Provider
            value={{
                stock,
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
                stockInfo,
                updateCartItemQuantity,
                removeFromCart
            }}
        >
            {children}
        </Context.Provider>
    )
}


export const useStateContext = () => useContext(Context)
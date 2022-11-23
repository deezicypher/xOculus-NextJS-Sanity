import React,{useRef} from 'react';
import Link from 'next/link';
import { urlFor } from '../utils/client';
import { useStateContext } from '../context/stateContext';
import {BiArrowBack} from 'react-icons/bi';
import {FiShoppingCart} from 'react-icons/fi';
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai';


const Cart = () => {
  const cartRef = useRef();
  const {totalPrice,setShowCart,totalQuantities, cartItems } = useStateContext();


  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button 
        type="button" 
        className="cart-heading"
        onClick={() => setShowCart(false)}
        >
          <BiArrowBack/>{"  "}
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items) </span>

        </button>
        {cartItems.length < 1 && (
          <div className='empty-cart'>
              <FiShoppingCart size={200}/>
              <h3>Oops Empt Cart</h3>
              <p><small>Add items</small></p>
              <Link href='/'>
                <button
                type='button'
                onClick={() => setShowCart(false)}
                className='btn'
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
        )}

<div className='product-container'>
        {cartItems.length >= 1 && (cartItems.map(product => (
          <div className='product' key={product._id} >
            <img 
            src={urlFor(product?.image[0]).url()}
            className='cart-product-image'/>
            <div className="item-desc">
            <div className='flex top'>
            <h5 className='name'>{product.name}</h5>
            <h4 className='price'>${product.price}</h4>
            </div>
            <div className='flex bottom'>
              <div>
                                <p className='quantity-desc'> 
                                    <span className='minus'
                                    onClick=""
                                    ><AiOutlineMinus/></span>
                                    <span className='num'
                                    onClick=""
                                    >0</span>
                                    <span 
                                    onClick=""
                                    ><AiOutlinePlus/></span>
                                </p>
                        
                            </div>
            </div>
            </div>
          </div>
        )))}
      </div>
      </div>
    </div>
  )
}

export default Cart
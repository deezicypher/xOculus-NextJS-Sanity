import React,{useRef} from 'react';
import Link from 'next/link';
import { urlFor } from '../utils/client';
import { useStateContext } from '../context/stateContext';
import {BiArrowBack} from 'react-icons/bi';
import {FiShoppingCart} from 'react-icons/fi';
import {AiFillMinusCircle,AiFillPlusCircle,AiOutlineDelete} from 'react-icons/ai';
import getStripePromise from '../utils/getStripe';
import toast from 'react-hot-toast';


const Cart = () => {
  const cartRef = useRef();
  const {totalPrice,setShowCart,totalQuantities, cartItems,updateCartItemQuantity,removeFromCart } = useStateContext();

  const handleCheckOut = async () => {
      const stripe = await getStripePromise();
      const response = await fetch('/api/stripe/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cartItems}),
      })

      if(response.statusCode === 500) return;

      const data = await response.json();
      toast.loading('Redirecting...');
      stripe.redirectToCheckout({sessionId: data.id})

  }
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
                                    onClick={()=> updateCartItemQuantity(product._id, 'dec')}
                                    ><AiFillMinusCircle/></span>
                                    <span className='num'
                                   
                                    >{product.quantity}</span>
                                    <span 
                                     className='plus'
                                     onClick={()=> updateCartItemQuantity(product._id, 'inc')}
                                    ><AiFillPlusCircle/></span>
                                </p>
              </div>
              <button 
                type='button'
                className='remove-item'
                onClick={() => removeFromCart(product)}
                >
                    <AiOutlineDelete/>
                </button>
            </div>
            </div>
          </div>
        )))}
      </div>
      {cartItems.length >= 1 && (
        <div className='cart-bottom'>
          <div className='total'>
            <h3>Subtotal: </h3>
            <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button className='btn' type='button' onClick={handleCheckOut}>
                    Check Out With Stripe
              </button>
              </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Cart
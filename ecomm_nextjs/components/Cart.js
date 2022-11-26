import React,{useRef} from 'react';
import Link from 'next/link';
import { urlFor } from '../utils/client';
import { useStateContext } from '../context/stateContext';
import {BiArrowBack} from 'react-icons/bi';
import {FiShoppingCart} from 'react-icons/fi';
import {AiFillMinusCircle,AiFillPlusCircle,AiOutlineDelete} from 'react-icons/ai';
import getStripePromise from '../utils/getStripe';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Cart = () => {
  const cartRef = useRef();
  const {totalPrice,setShowCart,totalQuantities,user, cartItems,updateCartItemQuantity,removeFromCart } = useStateContext();

  const router = useRouter();

  const handleStripe = async () => {
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

  const handleCheckOut = () => {
    if(!user){
      router.push('/Login?redirect=/shipping')
    }
    router.push('/shipping')
  }


  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <div className='cart-heading'>
        <div
        onClick={() => setShowCart(false)}
        >
          <BiArrowBack/>{"  "}
          </div>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items) </span>
          </div>
   
        {cartItems?.length < 1 && (
          <div className='empty-cart'>
              <FiShoppingCart className='cart-icon' size={200}/>
              <h3>Oops Empty Cart</h3>
              <br/>
              <p>Add items</p>
              <br/>
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
                    Check Out
              </button>
              </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default Cart
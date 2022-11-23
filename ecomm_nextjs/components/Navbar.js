import React from 'react';
import Link from 'next/link';
import {ImCart} from 'react-icons/im';
import Image from 'next/image'
import {Cart} from './index';
import { useStateContext } from '../context/stateContext';



const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
       <Image src='/logo.png' alt='' width="35" height="25" />
       {" "}xOculus
        </Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)} >
          <ImCart/>
          <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

     {showCart && ( <Cart/>)}
    </div>
  )
}

export default Navbar
import React from 'react';
import Link from 'next/link';
import {ImCart} from 'react-icons/im';
import Image from 'next/image'


const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
       <Image src='/logo.png' alt='' width="25" height="16" />
       {" "}xOculus
        </Link>
      </p>

      <button type='button' className='cart-icon' onClick="">
          <ImCart/>
          <span className='cart-item-qty'>1</span>
      </button>
    </div>
  )
}

export default Navbar
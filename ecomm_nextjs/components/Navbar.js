import React from 'react';
import Link from 'next/link';
import {ImCart} from 'react-icons/im';
import Image from 'next/image'
import {Cart} from './index';
import { useStateContext } from '../context/stateContext';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineLogin} from 'react-icons/ai';
import {RiAccountPinCircleLine} from 'react-icons/ri';
import Search from './Search';


const Navbar = () => {
  const {showCart, setShowCart, totalQuantities, showSearch, setShowSearch} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>
       <Image src='/logo.png' alt='' width="35" height="25" />
       {" "}Oculux
        </Link>
      </p>
<div className='action-btn'>
  <Link href="/auth/Login"> <AiOutlineLogin className="login-icon" fontSize={25} /></Link>
 
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)} >
          <ImCart/>
          <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      <div className='search-icon' onClick={() => setShowSearch(true)} >
          <BsSearch />
      </div>
      <Link href="/profile" >
        <RiAccountPinCircleLine fontSize={25}/>
      </Link>
      </div>
     {showCart && ( <Cart/>)}
     {showSearch && ( <Search/>)}
    </div>
  )
}

export default Navbar
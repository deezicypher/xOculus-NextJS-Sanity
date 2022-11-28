import React from 'react';
import Link from 'next/link';
import {ImCart} from 'react-icons/im';
import Image from 'next/image'
import {Cart} from './index';
import { useStateContext } from '../context/stateContext';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineLogin} from 'react-icons/ai';
import {RiAccountPinCircleLine,RiMenu2Fill} from 'react-icons/ri';
import Search from './Search';
import Sidebar from './Sidebar';


const Navbar = () => {
  const {showCart, setShowCart,setShowSidebar,showSidebar,user,logout, totalQuantities, showSearch, setShowSearch} = useStateContext()
  const {_id , name} = user;
  return (
    <div className='navbar-container'>
      <div className='menu'>
      <RiMenu2Fill fontSize={25} onClick={() => setShowSidebar(true)}/>
      </div>
      <p className='logo'>
        <Link href='/'>
       <Image src='/logo.png' alt='' width="35" height="25" />
       {" "}x-Oculus
        </Link>
      </p>
     
<div className='action-btn'>
  
 
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)} >
          <ImCart/>
          <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      <div className='search-icon' onClick={() => setShowSearch(true)} >
          <BsSearch />
      </div>
      {_id && (
      <Link href={`/Account`} >
        <RiAccountPinCircleLine className='profile-icon' fontSize={25}/>
      </Link>
      )
      }
{_id?
  <AiOutlineLogin onClick={() => logout()} className="login-icon logout" fontSize={25} />
     
      :
      <Link href="/Login"> <AiOutlineLogin className="login-icon" fontSize={25} />
      
      </Link>
     
}
      </div>
      {showSidebar && (
    <Sidebar setShowSearch={setShowSearch} user={user} setShowSidebar={setShowSidebar} />
    )}
     {showCart && ( <Cart/>)}
     {showSearch && ( <Search/>)}
    </div>
  )
}

export default Navbar
import React from 'react'
import Link from 'next/link';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineLogin, AiOutlineClose,AiFillGithub} from 'react-icons/ai';
import {RiAccountPinCircleLine} from 'react-icons/ri';
import Image from 'next/image';

const Sidebar = ({setShowSearch,setShowSidebar}) => {
  return (
    <div className='sidebar-wrapper'>
    <div className='sidebar'>
   < AiOutlineClose className='close-sidebar' onClick={() => setShowSidebar(false)} fontSize={30} />
        <div className='sidebar-con'>
    <div className='search-icon link' onClick={() => setShowSearch(true)} >
   <BsSearch fontSize={30} />{" "} Search
</div>

<Link href="/profile" > 
<div className=' link'>
      <RiAccountPinCircleLine className='profile-icon' fontSize={30}/> Account
      </div>
    </Link>

    
    <Link href="/Login"> 
    <div className='link'>
    <AiOutlineLogin className="login-icon"  fontSize={30} /> Login / Register
    </div>
    </Link>
 
    </div>
    <div className='sidebar-footer'>
    <div className='name-sec'>
        <Image src='/deezi-icon.png' alt='' width={30} height={30}/>
        <Link href='https://github.com/deezitheviper'><small>DeeziTheViper</small></Link>
        </div>
        <AiFillGithub/>
        
   </div>
    </div>
</div>
  )
}

export default Sidebar
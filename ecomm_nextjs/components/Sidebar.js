import React from 'react'
import Link from 'next/link';
import {BsSearch} from 'react-icons/bs';
import {AiOutlineLogin, AiOutlineClose,AiFillGithub} from 'react-icons/ai';
import {RiAccountPinCircleLine} from 'react-icons/ri';
import Image from 'next/image';


const Sidebar = ({setShowSearch,setShowSidebar, user}) => {

    const {_id, name} = user;
 
  return (
    <div className='sidebar-wrapper'>
        
    <div className='sidebar'>
   < AiOutlineClose className='close-sidebar' onClick={() => setShowSidebar(false)} fontSize={30} />
        <div className='sidebar-con'>
    <div className='search-icon link' onClick={() => setShowSearch(true)} >
   <BsSearch fontSize={30} />{" "} Search
</div>
{_id && (
<Link href={`/account/${_id}`} > 
<div className=' link'>
      <RiAccountPinCircleLine className='profile-icon' fontSize={30}/><span className='account-name'>{name}</span>
      </div>
    </Link>
)}

    
    <Link href="/Login"> 
    <div className='link'>
    <AiOutlineLogin className="login-icon"  fontSize={30} /> 
    {_id?
    <span>Logout</span> :
         <span>Login / Register</span>
    }
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
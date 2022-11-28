import React from 'react';
import {AiFillGithub} from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='footer-container'>
        <p> 2022 xOculus All rights reserved </p>
        <p className='icons'>
        <AiFillGithub/>
        </p><Link href='https://github.com/deezitheviper'><small>deezitheviper</small></Link>
    </div>
  )
}

export default Footer
import React from 'react';
import Link from 'next/link';
import { urlFor } from '../utils/client';


const FooterBanner = ({footerData:{image,smallText,midText,largeText1,detail, discount}}) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
            <p>{smallText}</p>
            <h3>{midText}</h3>
        <br/>
        <h1>{largeText1}</h1>
        </div>  
        <div className='right'>
          <h1>{discount}</h1>
          <p>{detail}</p>
        </div> 

        <img 
        src={urlFor(image[0]).url()}
        className='footer-banner-image'
        />
    </div>
    </div>
  )
}

export default FooterBanner
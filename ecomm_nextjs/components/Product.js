import React from 'react';
import { urlFor } from '../utils/client';
import Link from 'next/link';

const Product = ({product: {image, name, slug, price}}) => {
  return (
   <div>
    <Link href={`products/${slug.current}`}>
      <div className='product-card'>
        <img 
        src={urlFor(image[0]).url()}
        width={250}
        height={250}
        className='product-image'
        />
      </div>
    </Link>
   </div>
  )
}

export default Product
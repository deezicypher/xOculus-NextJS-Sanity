import React,{useState} from 'react';
import {FaTimes} from 'react-icons/fa';
import {InfinitySpin} from 'react-loader-spinner';
import { client,urlFor } from '../utils/client';


const Search = () => {
    const [searchItem, setSearchItem] = useState('')
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);


    const getProduct = async  (searchItem) => {
        if(searchItem !== '' || undefined){
        setSearchItem(searchItem)
        setLoading(true)
        const query = `*[_type == 'product' && name match '${searchItem}*' || title match '${searchItem}*']`;
        const res = await client.fetch(query);
        setProducts(res)
        console.log(res)
        setLoading(false)
    }
    }

  return (
    < >
    <div className='search-wrapper' >
        <div className='search-container'>
        <div className="search-heading">
        <span className='heading'>Search Oculux Store</span>
        <p><FaTimes fontSize={30} className="cancel-search"/></p>
        </div>
        <div className='search-sec'>
            <input type="text" 
            className='search-input'  
            placeholder='Search for Products' 
            onChange={e => getProduct(e.target.value)}
            />
        </div>
        <div className='search-content'>

            {loading?
                <div>
        <InfinitySpin  className="spinner"
  width='200'
  color="#1d66c1"
/>
</div>
:
<>
{products.length < 1 && searchItem !== ''?
<h4>No product found, try different keywords.</h4>
:
<div className='product-container'>
        {products.length >= 1 && (products.map(product => (
          <div className='search-product' key={product._id} >
            <img 
            src={urlFor(product?.image[0]).url()}
            className='search-product-image'/>
            <div className="item-desc">
            <div className='flex top'>
            <h5 className='search-name'>{product.name}</h5>
            <small className='search-price'>${product.price}</small>
            </div>
            </div>
            </div>
        )))
}
            </div>
     
 
}
</>
}



        </div>
        </div>
        </div>
    </>
  )
}

export default Search
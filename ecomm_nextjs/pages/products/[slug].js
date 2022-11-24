import React, { useEffect, useState } from 'react';
import {client, urlFor } from '../../utils/client';
import {AiOutlineMinus,AiFillStar, AiOutlinePlus,AiOutlineStop} from 'react-icons/ai';
import Product from '../../components/Product';
import { useStateContext } from '../../context/stateContext';
import toast from 'react-hot-toast';



const ProductDetails = ({product,products}) => {
    const {name,price,image,detail} = product;
    const [index, setIndex] = useState(0);
    const [stock, setStock] = useState();
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

    const stockInfo = async (id) => {
        const query = `*[_type == 'product' &&  _id == '${id}'] [0]`
        const product = await client.fetch(query)
       setStock(product.stock)

    }
    const handleBuyNow = () => {
        onAdd(qty, product);
        setShowCart(true);
    }

    useEffect(()=>{
        stockInfo(product._id)
},[product._id])
    return (
        <div>
            
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img className='product-detail-image' alt='' src={urlFor(image && image[index]).url()} />
                    </div>
                  
                    <div className="small-images-container">
                    {image?.map((item,i) => (
                          <img 
                          key={i}
                          src={urlFor(item).url()}
                          alt=""
                          className={i === index? "small-image selected-image" : "small-image"}
                          onMouseEnter=""
                          onClick={() => setIndex(i)}
                          />
                      ))}
                    </div>
                    </div>

                    <div className='product-detail-desc'>
                        <h1>{name}</h1>
                        <div className='reviews'>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            </div>
                            <h5>Details: </h5>
                            <p>{detail}</p>
                            <p className='price'>${price}</p>
                            <div className='quantity'>
                                <h3>Quantity: </h3>
                                <p className='quantity-desc'>
                                    <span className='minus'
                                    onClick={
                                        decQty
                                    }
                                    ><AiOutlineMinus/></span>
                                    <span className='num'
                                    
                                    >{qty}</span>
                                    <span className='plus'
                                    onClick={
                                        incQty
                                    }
                                    ><AiOutlinePlus/></span>
                                </p>
                            </div>
                            <div className='quantity'>
                                <h3>Stock:{" "} {stock} </h3>
                               
                            </div>
                            {stock >= 1 && (
                            <div className='buttons'>
                                <button 
                                type="button"
                                className='add-to-cart'
                                onClick={() => onAdd(qty,product)}
                                >
                                Add to Cart
                                </button>
                                <button 
                                type="button"
                                className='buy-now'
                                onClick={handleBuyNow}
                                >
                                Buy Now
                                </button>
                                
                            </div>
                            )}
                            {stock < 1 && (
                                <div className='stock-out'>
                                <AiOutlineStop fontSize={30}/> 
                                <h3>Out of Stock</h3> 
                                </div>
                                )}
                    </div>
                </div>
                <div className='similar-products-wrapper'>
                    <h2>Discover similar Products</h2>
                    <div className='marquee'>
                        <div className='similar-products-container track'>
                            {products.map((product) => (
                                <Product key={product._id} product={product}/>
                            ))}
                        </div>
                    </div>
                </div>
</div>
    )
}

export const getStaticPaths = async () => {
    const query = `*[_type == 'product']{
        slug{
            current
        }
    }`
    const products = await client.fetch(query);
    const paths = products.map(product => ({
        params: {
            slug: product.slug.current
        }
    }));


    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params:{slug}}) => {
   
    const productQuery = `*[_type == 'product' &&  slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == 'product']`

    const product = await client.fetch(productQuery);
    const products = await client.fetch(productsQuery);



    return {
        props: {products,product}
    }
   
}

export default ProductDetails
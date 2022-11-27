import React, { useEffect } from 'react'
import { useStateContext } from '../context/stateContext'
import { urlFor } from '../utils/client';
import {GrPaypal} from 'react-icons/gr';
import {FaStripeS} from 'react-icons/fa';
import { useRouter } from 'next/router';
import axios from 'axios';

const checkout = () => {
    const {cartItems,shippingDetails, totalPrice,user, totalQuantities} = useStateContext();
    const router = useRouter();



    const onPlace = async () => {
        try {
            const res = await axios.post('/api/orders/',{},{ headers: {"Authorization" : `Bearer ${user.token}`} })
            console.log(res.data)
    }catch(err){
        console.log(err)
    }
    }

    useEffect(() => {
      
        if(!shippingDetails){
            router.push('/shipping')
        }
        if(cartItems?.length <= 0 ){
            router.push('/shipping')
        }
    },[router,shippingDetails, user])

  return (
    <>
    <h2 className='order-header'>Check Out</h2>
    <div className='product-detail-container'>
        
            <div className='product-container'>
        {cartItems.length >= 1 && (cartItems.map(product => (
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

                    <div className='product-detail-desc order-details'>
                        
                       
                            <h3 className='order-sub-header'>Shipping Details: </h3>
                            <p>Name: <span className='orderD'>{shippingDetails?.name}</span></p>
                            <p>Address: <span className='orderD'>{shippingDetails?.address}</span></p>
                            <p>City: <span className='orderD'>{shippingDetails?.city}</span></p>
                            <p>Postal Code: <span className='orderD'>{shippingDetails?.postalcode}</span></p>
                            <p>Country: <span className='orderD'>{shippingDetails?.country}</span></p>
                            
                           
                            <div className='ship-quantity'>
                               <h3 >Total Quantity:{" "} {totalQuantities} </h3>
                        
                            <h3>Total Price:{" "} <span className='price'> ${totalPrice.toFixed(2)}</span> </h3>
                            </div>
                         
                           
                            <div className='order-buttons'>
                                <button 
                                type="button"
                                className='stripe-btn'
                                onClick={() => onPlace()}
                                >
                                <FaStripeS/> {" "}  Stripe
                                </button>
                                <button 
                                type="button"
                                className='buy-now'
                                
                                >

                                <GrPaypal/>{" "} Paypal
                                </button>
                                
                            </div>
                      
                         
                    </div>
                </div>
                </>
  )
}

export default checkout
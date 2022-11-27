import React, { useEffect, useRef } from 'react'
import { useStateContext } from '../context/stateContext'
import { urlFor } from '../utils/client';

import {FaStripeS} from 'react-icons/fa';
import { useRouter } from 'next/router';
import axios from 'axios';
import {PayPalButtons} from "@paypal/react-paypal-js";
import {toast} from 'react-hot-toast';
import getStripePromise from '../utils/getStripe';
const checkout = () => {
    const {cartItems,shippingDetails,orderProcessed, totalPrice,user, totalQuantities} = useStateContext();
    const router = useRouter();
    const style = {"layout":"vertical"};
   

    const onPlace = async (method,paymentResult) => {
        let {orderedOn,paid,...data }= paymentResult;
        const orderItems = cartItems.map(product => ( 
               {
                _key: product._id,
                product:{
                    _type:'reference',
                    _ref: product._id
                },
                name:product.name,
                image:urlFor(product.image[0]).url(),
                price:product.price,
                quantity:product.quantity,
                
            }
       
        ))
       
        const doc ={shippingAddress:shippingDetails,totalPrice,totalQuantities,orderItems,paymentMethod:method,
            paymentResult:data,
            paidOn:orderedOn,
            paid:paid,
        }
        try {
        const res = await axios.post('/api/orders/',doc,{ headers: {"Authorization" : `Bearer ${user.token}`} })
        if(method === 'PayPal'){
        toast.success("Order has been successfully placed")
        router.push(`/orders/${res.data}`)
        }
    }catch(err){
           console.log(err)
    }
    }


    const createOrder =  (data, actions) => {
        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: totalPrice,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                         
                            return orderId;
                        })
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then(async function (details) {
            const {payer,id,status,update_time
,                } = details
           
            const doc = {
                email:payer.email_address,
                id:id,
                status:'Processing',
                orderedOn:update_time,
                paid:true
            }
            try{
             await onPlace('PayPal',doc);
               
            }catch(err){
                console.log(err)
                toast.error("Payment failed, try again later")
            }
        });
    }

    const handleStripe = async () => {
        try{
        const stripe = await getStripePromise();
        const response = await axios.post('/api/stripe/',{cartItems})
        const {id} = response.data;
        const doc = {
            id:id,
            status:"Processing",
            orderedOn: new Date().toISOString(),
        }
        onPlace('Stripe',doc) 
        toast.loading('Redirecting...');
        stripe.redirectToCheckout({sessionId:id})

        }catch(err){
            console.log(err)
        }
     
     
  
    }

    useEffect(() => {
      
        if(!shippingDetails){
         router.push('/Login?redirect=/shipping')
        }
        if(cartItems?.length <= 0 ){
            router.push('/shipping')
        }
    },[router,shippingDetails, user])

  return (
    <>
    <h2 className='checkout-header'>Check Out</h2>
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
                                <div>
                                <button 
                                type="button"
                                className='stripe-btn'
                                onClick={() => handleStripe()}
                                >
                                <FaStripeS/> {" "}  Stripe
                                </button>
                                </div>
                                <div  className="paypal-btn">
                                <PayPalButtons 
                            createOrder={createOrder}
                            onApprove={onApprove}
                            />
                                
                            </div>
                            </div>
                  
                      
                         
                    </div>
                </div>
                </>
  )
}

export default checkout
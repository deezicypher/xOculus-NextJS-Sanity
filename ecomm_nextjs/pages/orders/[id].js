import React, { useEffect, useState } from 'react'
import {useRouter} from 'next/router';
import axios from 'axios';
import moment from 'moment';
import {GrPaypal} from 'react-icons/gr';
import {FaStripeS} from 'react-icons/fa';

const orderdetails = ({params}) => {

    const router = useRouter();
    const {method,success} = router.query;
    const {id} = params;
    const {session_id} = router.query;
    const [order, setOrder] = useState({});

    const {shippingAddress,paymentMethod, orderItems, paid, paidOn, paymentResult,totalPrice,totalQuantities} = order;
   

useEffect(() => {
    
    const getOrder = async () => {
       console.log(method === 'Stripe' && success === 'true' )
        if(method === 'Stripe' && success === 'true' ){
            try {
               
                const res = await axios.get(`/api/orders/stripe/${id}`)
                setOrder(res.data)
                 }catch(err){
                     console.log(err)
                 }
    }else{
      
        try {
            const res =  await axios.get(`/api/orders/${id}`)
            setOrder(res.data)
             }catch(err){
                 console.log(err)
             }
            
        }
    }
    getOrder()
    
},[])
  return (
   
    

 
    <div>
     
      <h6 className='checkout-header'>Order Details</h6>
      <div className='product-detail-container'>
        
        <div className='product-container'>
    {orderItems?.length >= 1 && (orderItems?.map(product => (
      <div className='search-product' key={product._id} >
  
        <img 
        src={product.image}
        className='search-product-image'/>
        <div className="item-desc">
        <div className='flex top'>
        <div>
        <h5 className='search-name'>{product.name}</h5>
        <br/>
        <p>Quantity - {" "}{product.quantity}</p>
        </div>
        <small className='search-price'>${product.price}</small>
        </div>
        </div>

        </div>
    )))
}
        </div>

                <div className='product-detail-desc'>
                    
                   
                        
                        <hr/>
                        <p>Name: <span className='orderD'>{shippingAddress?.name}</span></p>
                        <p>Address: <span className='orderD'>{shippingAddress?.address}</span></p>
                        <p>City: <span className='orderD'>{shippingAddress?.city}</span></p>
                        <p>Postal Code: <span className='orderD'>{shippingAddress?.postalcode}</span></p>
                        <p>Country: <span className='orderD'>{shippingAddress?.country}</span></p>
                        <p>Total Quantity: <span className='orderD'> {totalQuantities}</span></p>
                        <p>Total Price: <span className='orderD'>${totalPrice?.toFixed(2)}</span></p>
                    <br/>
                    <hr/>
                        <h4 className='order-sub-header'>{paymentMethod} Payment Details: </h4>
                        <p>Payment Method: <span className='orderD'>{method == "Stripe"?<FaStripeS/> : <GrPaypal/>}{" "} {paymentMethod}</span></p>
                        <p>Email: <span className='orderD'>{paymentResult?.email}</span></p>
                        <p>Payment Id: <span className='orderD'>{paymentResult?.id}</span></p>
                        <p>Paid On: <span className='orderD'>{moment(paidOn).format('MMMM Do YYYY, h:mm')}</span></p>
                      
                        <div className='ship-quantity'>
                        <hr/>
                        <br/>
                           <h3>Order Status:{" "} {paymentResult?.status}</h3>
                        {paid?
                        <h3>Payment:{" "} <span className='confirmed'>Confirmed </span> </h3>
                        :
                        <h3>Payment:{" "} <span className='processing' >Processing </span> </h3>
}
                        </div>
                     
                       
                   
              
                  
                     
                </div>
            </div>


    </div>



 
  )
}
export function getServerSideProps({params}){
    return {props: {params}}
}

export default orderdetails
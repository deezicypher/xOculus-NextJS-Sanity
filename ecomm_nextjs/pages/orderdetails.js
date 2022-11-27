import React from 'react'
import {useRouter} from 'next/router';
const orderdetails = () => {

    const router = useRouter();

    const {session_id} = router.query;


  return (
    <div className="auth-form shipping">
    

 
    <div className='form-heading shipping'>
      <h2>Order Details</h2>
      <p >
        Your order details
      </p>







    </div>



    
    </div>
  )
}

export default orderdetails
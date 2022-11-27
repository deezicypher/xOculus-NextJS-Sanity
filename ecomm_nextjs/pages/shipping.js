import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Cookies from 'js-cookie';
import { useStateContext } from '../context/stateContext';
import { useRouter } from 'next/router';


const shipping = () => {
    const {setShippingDetails,shippingDetails,cartItems,setShowCart, user} = useStateContext();
    const formSchema = yup.object().shape({
        name: yup.string()
        .required('Please enter your name'),
        address: yup.string()
        .required('Please enter your address'),
        city: yup.string()
        .required('Please enter your city'),
        postalcode: yup.number()
        .required('Please enter your city'),
        country: yup.string()
        .required('Please enter your city')

      })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit,setValue, formState: { errors } } = useForm(formOptions);
    const router = useRouter();


    const onSubmit = data => {
        if(cartItems.length <= 0) {
          setShowCart(true)
        }else{
        Cookies.set('shippingDetails',JSON.stringify(data));
        setShippingDetails(data)
        router.push('/checkout')
        }
    }



    useEffect(() => {
      if(cartItems?.length <= 0){
        setShowCart(true)
      }
       if (user){
        setValue('name',shippingDetails?.name )
        setValue('address',shippingDetails?.address)
        setValue('city',shippingDetails?.city)
        setValue('postalcode',shippingDetails?.postalcode)
        setValue('country',shippingDetails?.country)
       }else{
       router.push('/Login?redirect=/shipping')
       }

    }, [router,setValue,shippingDetails,user,cartItems])

  return (
    <div className='shipping-card'>
    
    <div className="auth-form shipping">
 
    <div className='form-heading shipping'>
      <h2>Shipping Details</h2>
      <p >
        to continue to checkout, fill shipping details
      </p>
    </div>


        <form onSubmit={handleSubmit(onSubmit)}>
     
        {errors.name && <p className='form-error' role="alert">{errors.name?.message}</p>}

<input
    placeholder='Full Name'
  {...register("name")}
/>

{errors.address && <p className='form-error' role="alert">{errors.address?.message}</p>}

<input
    placeholder='Address'
  {...register("address")}
/>

{errors.city && <p className='form-error' role="alert">{errors.city?.message}</p>}

<input
    placeholder='City'
  {...register("city")}
/>

{errors.postalcode && <p className='form-error' role="alert">{errors.postalcode?.message}</p>}

<input
    placeholder='Postal Code'
  {...register("postalcode")}
/>

{errors.country && <p className='form-error' role="alert">{errors.country?.message}</p>}

<input
    placeholder='Country'
  {...register("country")}
/>

<input className='shipping-btn'  type="submit" value="Continue" />
        </form>
    </div>
    
    </div>
  )
}

export default shipping
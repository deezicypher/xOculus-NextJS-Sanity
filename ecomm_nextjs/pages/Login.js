import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Login = () => {
    const formSchema = yup.object().shape({
        email: yup.string()
        .required('Please enter your email')
        .email('Enter a valid email address'),
        password: yup.string()
        .required('Please enter a password')
        .min(6, 'Password must be at 6 characters long'),

      })
    const router = useRouter();
    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);
    
    const onSubmit = async data => {
      const toastId = toast.loading("Logging in...")
      try{

          await axios.post('/api/auth/login', data)
          .then(res => {
          toast.success(`${res.data.msg}`,{
            id: toastId
          })
          Cookies.set('user',res,data.user,{expires:1})
          router.push('/')
        })

      }catch(err){
       console.log(err)
        toast.error(`${err.response.data}`,{
          id: toastId
        })
      }
    };
  return (
    <div className="auth-form">
 
    <div className='form-heading'>
      <h2>Sign in to your account</h2>
      <p >
        Or
        <Link href="/Register" className=""> create an account here</Link>
      </p>
    </div>


        <form onSubmit={handleSubmit(onSubmit)}>
     
        {errors.email && <p className='form-error' role="alert">{errors.email?.message}</p>}

<input
    placeholder='Email'
  {...register("email")}
/>

{errors.password && <p className='form-error' role="alert">{errors.password?.message}</p>}

<input
        placeholder='Password'
  {...register("password")}
/>


<input className='form-btn' type="submit" />
        </form>
    </div>
  )
}

export default Login
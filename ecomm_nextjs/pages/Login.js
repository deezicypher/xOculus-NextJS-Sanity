import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link';

const Login = () => {
    const formSchema = yup.object().shape({
        email: yup.string()
        .required('Please enter your email')
        .email('Enter a valid email address'),
        password: yup.string()
        .required('Please enter a password')
        .min(6, 'Password must be at 6 characters long'),

      })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => console.log(data);
  return (
    <div className="auth-form">
 
    <div className='form-heading'>
      <h2>Sign in to your account</h2>
      <p >
        Or
        <Link href="/auth/Register" className=""> create an account here</Link>
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
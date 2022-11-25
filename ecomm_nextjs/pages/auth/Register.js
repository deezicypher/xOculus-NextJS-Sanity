import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link';

const Register = () => {
    const formSchema = yup.object().shape({
        name: yup.string()
        .required('Please enter your name'), 
        email: yup.string()
        .required('Please enter your email')
        .email('Enter a valid email address'),
        address: yup.string()
        .required('Please enter your address'),
        password: yup.string()
        .required('Please enter a password')
        .min(6, 'Password must be at 6 characters long'),
        confirmPass: yup.string()
        .required('Confirm password')
        .oneOf([yup.ref('password')], 'Passwords does not match'),
      })

    const formOptions = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, watch, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => console.log(data);
  return (
    <div className="auth-form">
 
    <div className='form-heading'>
      <h2>Sign up an account</h2>
      <p >
        Or
        <Link href="/auth/Login" className=""> Login to your account here</Link>
      </p>
    </div>


        <form onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <p className='form-error' role="alert">{errors.name?.message}</p>}

        <input
        placeholder='Name'
  {...register("name")}
/>
{errors.email && <p className='form-error' role="alert">{errors.email?.message}</p>}

<input
    placeholder='Email'
  {...register("email")}
/>
{errors.address && <p className='form-error' role="alert">{errors.address?.message}</p>}

<input
        placeholder='Shipping address'
  {...register("address")}
/>
{errors.password && <p className='form-error' role="alert">{errors.password?.message}</p>}

<input
        placeholder='Password'
  {...register("password")}
/>
{errors.confirmPass && <p className='form-error' role="alert">{errors.confirmPass?.message}</p>}

<input
        placeholder='Confirm Password'
  {...register("confirmPass")}
/>

<input className='form-btn' type="submit" />
        </form>
    </div>
  )
}

export default Register
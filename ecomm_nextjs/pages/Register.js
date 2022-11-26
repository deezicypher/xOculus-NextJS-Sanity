import React, {useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { useStateContext } from '../context/stateContext';


const Register = () => {
  const {user} = useStateContext();
  const router = useRouter();
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
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
   


    const {redirect} = router.query;
    const onSubmit =  async data => {
        const {confirmPass, ...newData} = data;
        const toastId = toast.loading('Loading...');
        try{
          await axios.post('/api/auth/register',newData)
          .then(
            res => {
              toast.success(`${res.data}`, {
                id: toastId,
              })
              router.push(redirect || '/Login');
            }
          )
        }catch(err){
          toast.error(`${err.response.data}`, {
            id: toastId,
          })
        }

    };

    useEffect(() => {
      if(user){
        router.push(redirect || '/')
      }
    },[user,router, redirect])
    
  return (
    <div className="auth-form">
 
    <div className='form-heading'>
      <h2>Sign up an account</h2>
      <p >
        Or
        <Link href={`/Login?redirect=${redirect || '/'}`} className=""> Login to your account here</Link>
      </p>
    </div>


        <form onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <p className='form-error' role="alert">{errors.name?.message}</p>}

        <input
        onBlur={e => verifySignup(e.target.value)}
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
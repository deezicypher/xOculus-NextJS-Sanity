import React,{useEffect, useState} from 'react';
import {AiOutlineFile,AiFillSetting } from 'react-icons/ai';
import { useStateContext } from '../context/stateContext';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { client } from '../utils/client';
import { signToken } from '../utils/Token';
import Cookies from 'js-cookie';
import moment from 'moment';
import {AiOutlineFileText} from 'react-icons/ai';
import Link from 'next/link';


const Account = () => {
    const [activeTab, setActiveTab] = useState('Profile');
    const {user, setUser} = useStateContext();
    const [orders, setOrders] = useState([])
    const router = useRouter();

    const formSchema = yup.object().shape({
        name: yup.string()
        .required('Please enter your name'), 
        email: yup.string()
        .required('Please enter your email')
        .email('Enter a valid email address'),
        address: yup.string()
        .required('Please enter your address'),
    })


    const formOptions = {resolver: yupResolver(formSchema)}
    const { register, handleSubmit,setValue, formState: { errors } } = useForm(formOptions);
  
 
    const onSubmit = async data => {
        const toastId = toast.loading('Loading...');

        const {confirmPass, password,name,email,address} = data;
        if(password !== "" && password === confirmPass){
           
            
            client
            .patch(user._id)
            .set({
                name: name,
                email: email,
                address: address,
                password: password
            })
            .commit()
            .then(user => {
            const {_id, name,isAdmin,email} = user;
            const token = signToken({_id, name,isAdmin, email});
            const doc = {_id,name,token,email,isAdmin}
            Cookies.set('user',JSON.stringify(doc),{expires:1})
            setUser(doc)
            setValue('name', name);
            setValue('email', email);
            setValue('address', address);
            }).catch(err =>{
                toast.error("Can't update profile at this time", {
                    id: toastId
                })
            })
       
        }else{
            
            client
            .patch(user._id)
            .set({
                name: name,
                email: email,
                address: address
            })
            .commit()
            .then(user => {
            const {_id, name,isAdmin,email} = user;
            const token = signToken({_id, name,isAdmin, email});
            const doc = {_id,name,token,email,isAdmin}
            toast.success(`Profile Updated Successfully'`,{
                id: toastId
              })
            Cookies.set('user',JSON.stringify(doc),{expires:1})
            setUser(doc)
            setValue('name', name);
            setValue('email', email);
            setValue('address', address);
            }).catch(err =>{
                console.log(err)
                toast.error("Can't update profile at this time", {
                    id: toastId
                })
            })


    }
}

  
    



    useEffect(()=>{
        if(activeTab === "Profile"){
            const profile = async () => {
                try {
                    const res = await axios.get(`/api/profile/${user?._id}`,{headers:{
                        "Authorization": `Bearer ${user?.token}`
                    }})
                    const {name, email,address} = res.data;
                    setValue('name', name);
                    setValue('email', email);
                    setValue('address', address);
                }catch(err){
                    console.log(err)
                }
            }
            profile()
        }
        else if(activeTab === "Orders"){
            const orders = async () => {
                try {
                    const res = await axios.get(`/api/profile/orders/${user?._id}`,{headers:{
                        "Authorization": `Bearer ${user?.token}`
                    }})
                    console.log(res.data)
                    setOrders(res.data)
                }catch(err){
                    console.log(err)
                }
            }
            orders()
        }
    },[user, activeTab])

useEffect(() => {
    if(!user?._id){
        router.push('/Login?redirect=/Account')
    }
},[user])
  

if(!user)return (
   
    <h6 className='checkout-header'>.... </h6>

)
  return (
    <div className='account-page'>
        <h3 className='account-header'>My Account </h3>
        <div className='account-btns'>
            <btn type="btn" onClick={() => setActiveTab('Profile')}  className={activeTab == 'Profile'? 'account-btn active-tab ':'account-btn'}>
              <AiFillSetting/> Profile
            </btn>
            <btn type="btn" onClick={() => setActiveTab('Orders')} className={activeTab == 'Orders'? 'account-btn active-tab ':'account-btn'}>
               <AiOutlineFile/> Orders
            </btn>
        </div>

        <div className='account-content'>
            {activeTab == 'Profile' && (
        <div className="auth-form">
 
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
{...register("password",{
    validate: value => value === '' || value.length < 6 || 'Password must be at least 6 characters'
  })}
/>
{errors.confirmPass && <p className='form-error' role="alert">{errors.confirmPass?.message}</p>}

<input
     placeholder='Confirm Password'
{...register("confirmPass")}
/>

<input className='form-btn' value="Update"  type="submit" />
             </form>
        </div>
            )}

{activeTab == 'Orders' && (
        <div className="order-list">
             
   
            {orders?.map(order => (
                <div className="list-items">
                    <AiOutlineFileText/>
                    <p className='pItem' >
                    {order._id}
                   </p>
                   <p className='pItem' >{moment(order.orderedOn).format('MMMM Do YYYY, h:mm')}</p>
                   <p className='pItem' >{order.paymentResult.status}</p>
                   <p className='pItem' >{order.totalPrice}</p>
                   <p className='pItem' >{order.totalQuantities}</p>
                    <Link href={`/orders/${order._id}`} className="order-list-btn">View Details</Link>
                </div>
            ))}
        </div>
            )}
        </div>

</div>
  )
}

export default Account
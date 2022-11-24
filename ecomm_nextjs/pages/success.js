import React,{useEffect, useState} from "react";
import Link from "next/link";
import {FaShoppingBag} from 'react-icons/fa';
import Image from 'next/image'
import { useStateContext } from "../context/stateContext";
import { runConfetti } from "../utils/confetti";



const Success = () => {
    const {setCartItems, setTotalPrice,setTotalQuantities} = useStateContext()
    const [order, setOrder] = useState();


    useEffect(()=> {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runConfetti();
    },[])

    return (
        <div >
            <div className='success'>
           
            <Image src="/oculusx.png" alt='' className="success-img" width="150" height="150"  />

                <p className="icon">
                    <FaShoppingBag/>
                </p>
                <h2>Your Order has been processed successfully</h2>
                <p className="email-msg">Details has been sent to your inbox</p>
                <p className="description">
                    For Questions and inquiries, please contact  
                   <a className="email" href="mailto:deezitheviper@gmail.com">deezitheviper@gmail.com</a>
                </p>

                <Link href="/" >
                    <button
                        type="button"
                        className="btn btn-success"
                       
                        >Continue Shopping </button>
                </Link>
  
</div>
        </div>
    )
}

export default Success;
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export const signToken = (user) => {
    return jwt.sign(user,process.env.NEXT_PUBLIC_JWT_KEY,{
        expiresIn:'1d'})
}

export const isAuth = async (req, res) => {
        const {authorization} = req.headers;
        if (authorization){
            const token = authorization.slice(7, authorization.length);
            jwt.verify(token,process.env.NEXT_PUBLIC_JWT_KEY,(err, decode)=>{
                if(err){
                    console.log(err)
                    res.status(401).send("authorization failed")
                }else{ 
                    req.user = decode;
                    return NextResponse.next()
                }
            })
        }else{
            res.status(401).json("Not Authenticated")
        }
}
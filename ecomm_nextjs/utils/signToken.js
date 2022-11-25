import jwt from 'jsonwebtoken';

export const signToken = (user) => {
    return jwt.sign(user,process.env.NEXT_PUBLIC_JWT_KEY,{
        expiresIn:'1d'})
}
import { client } from "../../../utils/client";
import bcrypt from 'bcryptjs';
import { verifyEmailQ } from "../../../utils/query";
import { signToken } from "../../../utils/Token";

export default   async function(req, res) {
    const {email, password} = req.body;
    if (req.method === 'POST') {
        try {
        const user =  await client.fetch(verifyEmailQ(email));
       
        if(!user) return res.status(404).json('User with email not found');
        if(user && bcrypt.compareSync(password, user.password)){
            const {_id, name,isAdmin,email} = user;
            const token = signToken({_id, name,isAdmin, email});
            const doc = {_id,name,token,email,isAdmin}
            res.status(200).json({user:doc,msg:'Login successful'})
        }else{
            res.status(401).json('Wrong credentials')
           }
        }catch(err){
            res.status(500).json("Unable to proceed further at the moment")
        }
    }else{
        res.status(405).end();
    }
  }

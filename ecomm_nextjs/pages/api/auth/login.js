import { client } from "../../../utils/client";
import bcrypt from 'bcryptjs';
import { verifyEmailQ } from "../../../utils/query";

export default function  (req, res) {
    const user = req.body
    const pass = user.password
    const query = verifyEmailQ(user.email)
    
    
    if (req.method === 'POST') {
    
        client.fetch(query).then(

             result => {
                if(result.length > 0) {
                    const {password} = result[0];
                    const checkpass = bcrypt.compareSync(pass, password)
                    if(checkpass){
                        const {_id, name, token,email} = result[0];
                        const doc = {_id,name,token,email}
                        res.status(200).json({user:doc,msg:'Login successful'})
                    }else{
                     res.status(401).json('Wrong credentials')
                    }
                }else{
                    res.status(404).json('User with email not found')
                }
            }
        ).catch(err => console.log(err));
    }
else {
      // Handle any other HTTP method
      res.status(405).end();
    }
  }

import { client } from "../../../utils/client";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { signToken } from '../../../utils/signToken';
import { verifyEmailQ } from "../../../utils/query";

export default function  (req, res) {
    const user = req.body
    var salt = bcrypt.genSaltSync(10);
    const password = user.password;
    var hash = bcrypt.hashSync(password, salt)
    const token = signToken(user)
    const doc = {...user,password:hash,_type:'user',token}
    const query = verifyEmailQ(user.email)

    if (req.method === 'POST') {
    
            client.fetch(query).then(

                result => {
                    if(result.length <= 0) {
                        client.create(doc).then(
                            result => {
                            res.status(200).json("Registered successfully")
                            }
                         )
                    }else{
                        res.status(500).json('User with email already exists')
                    }
                }
            ).catch(err => console.log(err));
        }
      
else {
      // Handle any other HTTP method
      res.status(405).end();
    }
  }
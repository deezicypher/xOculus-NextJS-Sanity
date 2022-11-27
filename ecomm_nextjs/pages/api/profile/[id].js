import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { client } from "../../../utils/client";
import { isAuth, signToken } from "../../../utils/Token";

export default async function(req, res){
    const id = req.query.id;
    if(req.method === "GET"){
    if(isAuth(req, res)){
        try{
            const result = await client.fetch(`*[_type == "user" && _id == "${id}"][0]`)
              res.status(200).json(result)
        }catch(err){
            console.log(err)
             res.status(500).json(err)
        }
    }
}
else if(req.method == "PATCH"){
    if(isAuth(req, res)){
        if(req.body.password){
           
            client
            .patch(id)
            .set({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                password: req.body.password
            })
            .commit()
            .then(user => {
            const {_id, name,isAdmin,email} = user;
            const token = signToken({_id, name,isAdmin, email});
            const doc = {_id,name,token,email,isAdmin}
             res.status(200).json({user:doc,msg:'Profile Updated Successfully'});
            }
           )
           .catch(err => {
            res.status(500).json(err)
            console.error(err);
        })

        }else{
          try {
            await client
            .patch(id)
            .set({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address
            })
            .commit()
            .then(user => {
            const {_id, name,isAdmin,email} = user;
            const token = signToken({_id, name,isAdmin, email});
            const doc = {_id,name,token,email,isAdmin}
            return res.status(200).json({user:doc,msg:'Profile Updated Successfully'});
            })

        }catch (err) {
            
                console.error(err);
                return res.status(500).json(err)
                
            }
            
          
        }
        }
    }
else{
    return  res.status(405).end("Request method not allowed")
}
}
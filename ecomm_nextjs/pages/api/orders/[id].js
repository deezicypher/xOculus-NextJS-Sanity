import { client } from "../../../utils/client";
import { isAuth } from "../../../utils/Token";

export default async function (req, res){
    const id = req.query.id;
    if(req.method ==='GET'){
        if(isAuth(req,res)){
           
            try{
                const result = await client.fetch(`*[_type == "order" && _id == "${id}"][0]`)
               res.status(200).json(result);
            }catch(err){
                console.log(err)
            }
        }
    }
}
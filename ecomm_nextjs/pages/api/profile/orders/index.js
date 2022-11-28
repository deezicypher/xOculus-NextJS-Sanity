import { client } from "../../../../utils/client";
import { isAuth } from "../../../../utils/Token";
   
 
export default async function (req, res){
    const id = req.query.id;
    if(req.method ==='GET'){
        if(isAuth(req,res)){
           
            try{
                const result = await client.fetch(`*[_type == "order" && user._id == "${id}"][0]`)
               res.status(200).json(result);
              
            }catch(err){
                console.log(err)
            }
        }
    }else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
import { client } from "../../../utils/client";
import { isAuth } from "../../../utils/Token";


export default async function handler (req, res) {
    
if (req.method === "POST") {
    
    
    if(isAuth(req,res)){
        const doc = {
            ...req.body, 
            orderedOn: new Date().toISOString(),
            name: req.user.name,
            _type:'order',
            user:{
                _type:'reference',
                _ref: req.user._id
            }
        };
        try{
        const result = await client.create(doc)
        res.status(201).json(result._id)
        }catch(err){
            console.log(err)
        }
    }
}else{

res.status(405).end();
}
}
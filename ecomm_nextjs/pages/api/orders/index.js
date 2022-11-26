import { client } from "../../../utils/client";
import { isAuth } from "../../../utils/Token";


export default async function handler (req, res) {
    
if (req.method === "POST") {
    if(await isAuth(req,res)){
       
    }
}else{

res.status(405).end();
}
}
import { client } from "../../../utils/client";
import { isAuth } from "../../../utils/Token";


export default async function handler (req, res) {
    
if (req.method === "POST") {
    if(isAuth(req,res)){
       console.log(req.user)
    }
}else{

res.status(405).end();
}
}
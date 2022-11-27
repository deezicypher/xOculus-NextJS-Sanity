import { client } from "../../../utils/client";

export default async function (req, res){
    const id = req.query.id;
    if(req.method ==='GET'){
            try{
                const resu = await client.fetch(`*[_type == "order" && paymentResult.id == "${id}"][0]`)
                console.log(resu)
                res.status(200).json(result);
            }catch(err){
                console.log(err)
            }
        }
}
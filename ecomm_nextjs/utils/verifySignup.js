import { client } from "./client"
export const verifySignup = (email) => {
    const query = `*[_type == 'user' && email match '${email}']`
    var result;
    client.fetch(query).then(
        res => {
            if(res.length > 0) {
                result = false;
            }else{
                result = true;
            }
        }
    )
    return result;
}
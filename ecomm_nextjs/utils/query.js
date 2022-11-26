
export const verifyEmailQ = (email) => {
    const query = `*[_type == "user" && email == "${email}"][0]`
    return query
}
export const LoginQuery = (email,password) => {
    const query = `*[_type == 'user' && email match '${email}' && password match '${password}']`
    return query
}

export const verifyEmailQ = (email) => {
    const query = `*[_type == 'user' && email match '${email}']`
    return query
}
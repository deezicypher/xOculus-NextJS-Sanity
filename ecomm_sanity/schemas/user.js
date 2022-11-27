export default {
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            unique: true,
        },
        {
            name: 'address',
            title: 'Shipping Address',
            type: 'string',
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string',
        },
        {
            name: 'token',
            title: 'Token',
            type: 'string',
        },
        {
            name: 'isAdmin',
            title: 'Is Admin',
            type: 'boolean',
            default: false,
        }
    ]
}
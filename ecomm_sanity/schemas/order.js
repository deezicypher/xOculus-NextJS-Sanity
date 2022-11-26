export default {
    name: 'order',
    title:'Order',
    type:'document',
    fields:[
        {
            name: 'user',
            title: 'User',
            type: 'reference',
            to:[{type: 'user'}],
            options:{
                disableNew: true,
            }
        },
        {
            name:'name',
            title:'Full Name',
            type:'string'
        },
        {
            name:'totalPrice',
            title:'Total Price',
            type:'number'
        },
        {
            name:'totalQuantities',
            title:'Total Quantities',
            type:'number'
        },
        {
            name:'shippingAddress',
            title:'Shipping Address',
            type:'shippingAddress'
        },
       
        {
            name:'paymentMethod',
            title:'Payment Method',
            type:'string'
        },
        {
            name:'paymentResult',
            title:'Payment Result',
            type:'paymentResult'
        },
        {
            name:'cartItems',
            title:'Cart Items',
            type:'array',
            of:[
                {
                    title:'Cart Item',
                    type:'cartItem'
                }
            ]
        },
        {
            name:'paid',
            title:'Paid',
            type:'boolean'
        },
        {
            title:'Paid On',
            name:'paidOn',
            type:'datetime',
        },
        {
            name:'delivered',
            title:'Delivered',
            type:'boolean'
        },
        
        {
            name:'deliveredOn',
            title:'Delivered On',
            type:'datetime',
        },
        {
            name:'orderedOn',
            title:'Ordered On',
            type:'datetime'
        }


    ]
}
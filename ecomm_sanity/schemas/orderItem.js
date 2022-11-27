export default {
    name: 'orderItem',
    title:'Order Item',
    type:'object',
    fields:[
        {
            name: 'product',
            title: 'Product',
            type: 'reference',
            to:[{type: 'product'}],
            options:{
                disableNew: true,
            }
        },
        {
            name:'name',
            title:'Name',
            type:'string',
        },
        {
            name:'quantity',
            title:'Quantity',
            type:'number',

        },
        {
            name:'image',
            title:'Image',
            type:'string',
        },
        {
            name:'price',
            title:'Price',
            type:'number',
        }
    ]
}
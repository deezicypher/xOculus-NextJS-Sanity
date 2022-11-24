export default {
    name:'product',
    title:'Product',
    type: 'document',
    fields:[
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options:{
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name:'slug',
            title: 'Slug',
            type: 'slug',
            options:{
                source: 'name',
                maxLength:90,
        }
    },
    {
        name:'price',
        title: 'Price',
        type: 'number',
    },
    {
        name:'detail',
        title: 'Detail',
        type: 'string',
    },
    {
        name:'stock',
        title: 'Stock',
        type: 'number',
        initialValue: 1
    }
]
}
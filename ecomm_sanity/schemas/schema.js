import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import banner from './banner';
import product from './product';
import user from './user';
import order from './order';
import shippingAddress from './shipAdress';
import paymentResult from './paymentResult';
import orderItem from './orderItem';


export default createSchema({

  name: 'default',

  types: schemaTypes.concat([
    product,banner,user,order,shippingAddress,paymentResult,orderItem
  ]),
})

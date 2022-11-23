import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default async function handler (req, res) {
    if (req.method === 'POST') {
      
        try {

          const session = await stripe.checkout.sessions.create({
            submit_type: 'pay',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate:'shr_1M7KvWHqzfM7ax5lNsgaN77m'
                },
                {
                    shipping_rate: 'shr_1M7KxTHqzfM7ax5luxgtjfuc'
                }
            ],
            line_items: req.body.cartItems.map( product => {
              const image = product.image[0].asset._ref;
             const newImage = image.replace('image-','https://cdn.sanity.io/images/qpo6vf32/production/')
             .replace('-png','.png')

             return {
              price_data: {
                currency:'usd',
                product_data: {
                  name: product.name,
                  images:[newImage]
                },
                unit_amount: product.price * 100,
              },
              adjustable_quantity: {
                enabled:true,
                minimum:1,
              },
              quantity: product.quantity
             }
            }),
            mode: 'payment',
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
          });

          
          res.status(200).json(session)

          //res.redirect(303, session.url);
        } catch (err) {
          res.status(err.statusCode || 500).json(err.message);
        }
      } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
      }
}

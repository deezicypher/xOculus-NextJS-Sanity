import React from 'react'
import {HeroBanner, Footer} from '../components/Index.js'
import {client, urlFor} from '../utils/client.js'


const Home = ({products,bannerData}) => {
  return (
   <div className='main-container'>
   <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>


    {console.log(products)}
    {products.map(product => (
      console.log(urlFor(product.image).url())
    )) 
    }
   <div className='products-heading'>
    <h2 >Title</h2> 
    <p>Title</p>
   </div>

   <div className='products-container'>
    {['p1','p2','p3','p4','p5','p6','p'].map(product => (
      product
    ))}
   </div>

   <Footer />
   </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery =  `*[_type == "banner"]`
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {products,bannerData}
  }

}

export default Home
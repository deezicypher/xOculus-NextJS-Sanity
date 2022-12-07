import React from 'react'
import {HeroBanner, Footer, Product, FooterBanner} from '../components/index.js'
import {client, urlFor} from '../utils/client.js'
import Link from 'next/link.js'

const Home = ({products,bannerData}) => {




  return (
   <div className='main-container'>
   <HeroBanner heroBanner={bannerData.length && bannerData[1]}/>



   <div className='products-heading'>
    <h2 >Explore the world of Oculus</h2> 
    <br/>
    <p>Discover</p>
   </div>

   <div className='products-container '>
    {products.map((product,i) => (
      <Product key={i} product={product}/>
    ))}
   </div>
   <div className='products-container '>
   <Link href="/products" className='all_btn'>
       View all Products
    </Link>
    </div>
   <FooterBanner footerData={bannerData.length && bannerData[0]}/>
   </div>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product" && stock > 0]';
  const products = await client.fetch(query);

  const bannerQuery =  `*[_type == "banner" ]`
  const bannerData = await client.fetch(bannerQuery);


  return {
    props: {products,bannerData}
  }

}

export default Home
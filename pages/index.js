import fs from 'fs/promises';
import path from 'path';
import React from 'react'
import Link from 'next/Link'

const Home = () => {
  return (
    <div> {products.map((product) => 
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link></li>
   )}
    </div>
  )
}


export async function getStaticProps(){
    const filePath = path.join(process.cwd(), 'data', 'random-backend.json') 
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    if(!data) {
      return {
        redirect: {
          destination: '/Home'
        }
      }
    }
    
    if(!data?.title?.length === 0 ) {
      return {notFound: true};
    }
    return {
        props: {
            product: data.products
        },
        revalidate: 50
    }
}

export default Home;
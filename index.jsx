import fs from 'fs/promises';
import path from 'path';
import React from 'react'

const Home = () => {
  return (
    <div> {products.map((product) => 
        <li key={product.id}>{product.title}</li>
   )}
    </div>
  )
}

export async function getStaticProps(){
    const filePath = path.join(process.cwd(), 'data', 'random-backend.json') 
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return {
        props: {
            product: data.products
        }
    }

}
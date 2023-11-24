import React from 'react'
import fs from 'fs';
import path from 'path';
import { func } from 'prop-types';

const ProductDescription = (props) => {
    const {loadedProduct} = props

    // if (!loadedProduct) {
    //     return <p>Loading..</p>  ** if fallback is true we need this statement
    // }

  return (
    <div>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
    </div>
  )
}

async function getData () {
    const filePath = path.join(process.cwd(), 'data', 'random-backend.json');
    const jsonData = fs.readFile(filePath); 
    const data = JSON.parse(jsonData);

    return data;
}

export async function getstaticProps(context) {
    const {params} = context;
    const productId = params.prodId
    const data = await getData();
    

    const product = data.products.find(product => product.id === productId )
    return {
        props : {
            loadedProduct: product
        }

    } 
} 

export async function getStaticPaths() {
    const data = await getData();

    const ids = data.products.map(product => product.id)
    const pathsWithParams = ids.map(id => ({params: { prodId: id }}))
    return {
        paths: pathsWithParams,
        fallback: false
    }
}

export default ProductDescription
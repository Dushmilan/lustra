import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../types/Product';
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'products', 'products.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        const products = JSON.parse(
          fs.readFileSync(productsFilePath, 'utf8')
        ) as Product[];
        res.status(200).json(products);
        break;

      case 'POST':
        const newProduct = req.body as Product;
        const productsData = JSON.parse(
          fs.readFileSync(productsFilePath, 'utf8')
        ) as Product[];
        
        const updatedProducts = [...productsData, newProduct];
        fs.writeFileSync(productsFilePath, JSON.stringify(updatedProducts, null, 2));
        res.status(201).json(newProduct);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

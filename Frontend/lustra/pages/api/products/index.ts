import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../types/Product';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method } = req;

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    switch (method) {
      case 'GET':
        const response = await axios.get(`${API_BASE_URL}/api/products`, config);
        res.status(200).json(response.data);
        break;

      case 'POST':
        const newProduct = req.body as Product;
        const createResponse = await axios.post(
          `${API_BASE_URL}/api/products`,
          newProduct,
          config
        );
        res.status(201).json(createResponse.data);
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

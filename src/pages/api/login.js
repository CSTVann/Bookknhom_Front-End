import axios from 'axios';
import configs from '../../../configs.json';

export default async function handler(req, res) {
  const formData = req.body;
  try {
    const response = await axios.post(`${configs.host}/api/register`, formData);
    res.status(201).json(response.data); // Send 201 Created response on successful addition
  } catch (error) {
    console.error('Error adding admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

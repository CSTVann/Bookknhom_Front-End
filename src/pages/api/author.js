import axios from 'axios';
import configs from '../../../configs.json';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'DELETE') {
    // Handle DELETE requests for deleting data
    const authorID = query.id;
    try {
      await axios.delete(`${configs.host}/api/authors/${authorID}`);
      res.status(204).end(); // Send 204 No Content response on successful deletion
    } catch (error) {
      console.error('Error deleting author:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (method === 'POST') {
    // Handle POST requests for adding new data
    const formData = req.body; // Assuming the form data is sent in the request body
    try {
      const response = await axios.post(`${configs.host}/api/authors`, formData);
      res.status(201).json(response.data); // Send 201 Created response on successful addition
    } catch (error) {
      console.error('Error adding author:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (method === 'PUT') {
    // Handle PUT requests for updating existing data
    const authorID = query.id;
    const formData = req.body; // Assuming the updated data is sent in the request body
    try {
      await axios.put(`${configs.host}/api/authors/${authorID}`, formData);
      res.status(200).end(); // Send 200 OK response on successful update
    } catch (error) {
      console.error('Error updating author:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods (GET, PATCH, etc.) for fetching and updating data
    try {
      const response = await axios.get(`${configs.host}/api/authors`);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching data from ${configs.host}/api/authors', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

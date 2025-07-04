import axios from "axios";
import configs from '../../../configs.json';

export default async function handler(req, res){
    if (req.method === 'POST') {
        // Handle POST requests for adding new data
        const formDatas = req.body; // Assuming the form data is sent in the request body
        try {
          const response = await axios.post(`${configs.host}/api/suggestbook`, formDatas);
          res.status(201).json(response.data); // Send 201 Created response on successful addition
        } catch (error) {
          console.error('Error adding admin:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Handle other HTTP methods (GET, PATCH, etc.) for fetching and updating data
        try {
          const response = await axios.get(`${configs.host}/api/suggestbook`);
          res.status(200).json(response.data);
        } catch (error) {
          console.error('Error fetching data from ${configs.host}/api/suggestbook:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } 
}
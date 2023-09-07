import db from '../../config/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      db.query('SELECT * FROM info', (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ message: 'Error fetching data' });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

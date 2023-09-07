import db from '../../config/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { name, surename, contactNo, address, pinCode } = req.body;

    try {
      await db.query('INSERT INTO info (name, surename, contactNo, address, pinCode) VALUES (?, ?, ?, ?, ?)', [name, surename, contactNo, address, pinCode]);
      res.status(200).json({ message: 'Data submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

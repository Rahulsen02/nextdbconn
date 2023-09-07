import db from '../../config/db';
export default async (req, res) => {
  if (req.method !== 'DELETE') {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  const { name } = req.body;

  try {
    const result = await db.query('DELETE FROM info WHERE name = ?', [name]);
    console.log('Deleted rows:', result.affectedRows);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ message: 'Error deleting data' });
  }
};
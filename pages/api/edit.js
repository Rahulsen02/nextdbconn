import db from '../../config/db';
if (req.method === 'PUT') {
  const { name, surename, contactNo, address, pinCode } = req.body;

  try {
    console.log('Request Body:', req.body);
    console.log('Searching for:', name);

    const query = 'UPDATE info SET surename=?, contactNo=?, address=?, pinCode=? WHERE name=?';
    const params = { surename, contactNo, address, pinCode, originalName: name };

    console.log('Executing Query:', query);
    console.log('Query Parameters:', params);

    const result = await db.query(query, params);
    console.log('Database Result:', result);

    if (result.affectedRows > 0) {
      console.log('Updated rows:', result.affectedRows);
      res.status(200).json({ message: 'Data updated successfully', updatedRows: result.affectedRows });
    } else {
      res.status(404).json({ message: 'Data not found for update', queryParams: params });
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ message: 'Error updating data' });
  }
} else {
  res.status(405).end();
}


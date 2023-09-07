import React, { useState } from 'react';

const EditModal = ({ item, onSave, onClose, setMessage }) => {
  const [editedData, setEditedData] = useState({
    name: item.name,
    surename: item.surename,
    contactNo: item.contactNo,
    address: item.address,
    pinCode: item.pinCode,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const responseMessage = await onSave(editedData);
      setMessage(responseMessage);
      onClose();
    } catch (error) {
      setMessage('Error editing data.');
      console.error(error);
    }
  };

  return (
    <div style={{ background: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ background: 'grey', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{color:'aqua'}}>Edit Details</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={editedData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="surename">Surename:</label>
          <input type="text" id="surename" name="surename" value={editedData.surename} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="contactNo">Contact Number:</label>
          <input type="text" id="contactNo" name="contactNo" value={editedData.contactNo} onChange={handleChange} maxLength={10} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={editedData.address} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="pinCode">Pin Code:</label>
          <input type="text" id="pinCode" name="pinCode" value={editedData.pinCode} onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleSave} style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}>Save</button>
          <button onClick={onClose} style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '20px',
        }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

import React, { useState } from 'react';

function EditPopup({ editItem, onClose, onSave }) {
  const [editedData, setEditedData] = useState({ ...editItem });

  const handleFieldChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="edit-popup">
      <h2>Edit Data</h2>
      <label htmlFor="editedName">Name:</label>
      <input
        type="text"
        id="editedName"
        value={editedData.name}
        onChange={(e) => handleFieldChange('name', e.target.value)}
        required
      />
      <label htmlFor="editedSurename">Surename:</label>
      <input
        type="text"
        id="editedSurename"
        value={editedData.surename}
        onChange={(e) => handleFieldChange('surename', e.target.value)}
        required
      />
      <label htmlFor="editedContactNo">Contact Number:</label>
      <input
        type="text"
        id="editedContactNo"
        value={editedData.contactNo}
        onChange={(e) => handleFieldChange('contactNo', e.target.value)}
        required
      />
      <label htmlFor="editedAddress">Address:</label>
      <input
        type="text"
        id="editedAddress"
        value={editedData.address}
        onChange={(e) => handleFieldChange('address', e.target.value)}
        required
      />
      <label htmlFor="editedPinCode">Pin Code:</label>
      <input
        type="text"
        id="editedPinCode"
        value={editedData.pinCode}
        onChange={(e) => handleFieldChange('pinCode', e.target.value)}
        required
      />
      <button onClick={handleSave} style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}>Update</button>
      <button onClick={onClose} style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}>Cancel</button>
    </div>
  );
}

export default EditPopup;

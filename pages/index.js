import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from '@/components/EditModal';

const buttonStyles = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '8px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  margin: '0 5px',
};

function Home() {
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [pinCode, setPinCode] = useState('');


  const [fetchedData, setFetchedData] = useState([]);

  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [message, setMessage] = useState('');


  const openEditModal = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingItem(null);
    setIsEditModalOpen(false);
  };


  const handleDeleteClick = (name) => {
    const confirmDelete = window.confirm('Do you really want to delete this data?');
    if (confirmDelete) {
      deleteItem(name);
    }
  };

  const deleteItem = async (name) => {
    try {
      await axios.delete(`/api/delete`, { data: { name } });
      setMessage('Data deleted successfully!');
      fetchData(); 
    } catch (error) {
      setMessage('Error deleting data.');
      console.error(error);
    }
  };

  const editItems = async (itemName, data) => {
    try {
      await axios.put(`/api/edit/`, { ...data, name: itemName });
      return 'Data updated successfully!';
    } catch (error) {
      console.error(error);
      throw new Error('Error updating data');
    }
  };
  <EditModal
  item={editingItem}
  onSave={(editedData) => handleEditSave(editedData)} // Pass the handleEditSave function
  onClose={closeEditModal}
  setMessage={setMessage}
/>

  const handleEditSave = async (editedData) => {
    try {
      const message = await editItems(editingItem.name, editedData);
      fetchData(); // Fetch updated data
      return message;
    } catch (error) {
      setMessage('Error editing data.');
      console.error(error);
      throw new Error('Error editing data');
    }
  };


  
  
  useEffect(() => {
  if (editItem) {
    setName(editItem.name);
    setSurename(editItem.surename);
    setContactNo(editItem.contactNo);
    setAddress(editItem.address);
    setPinCode(editItem.pinCode);
  } else {
    resetFormFields(); // Reset form fields for new submissions
  }
}, [editItem]);

  

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/fetchData');
      setFetchedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const submit = async (data) => {
    try {
      const response = await axios.post('/api/submit', data);
      return response.data.message;
    } catch (error) {
      console.error('Error submitting data:', error);
      throw new Error('Error submitting data');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      surename,
      contactNo,
      address,
      pinCode,
    };
  
    try {
      let message;
      if (editItem) {
        message = await editItems(editItem.name, data);
      } else {
        message = await submit(data);
      }
  
      setMessage(message);
      resetFormFields();
      fetchData(); // Fetch updated data
    } catch (error) {
      setMessage('Error in submitting data.');
      console.error(error);
      resetFormFields();
    }
  };
  
  
  const resetFormFields = () => {
    setName('');
    setSurename('');
    setContactNo('');
    setAddress('');
    setPinCode('');
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <h1 style={{ color: 'red', marginBottom: '20px' }}>Personal Details</h1>

      <form onSubmit={handleSubmit}style={{ maxWidth: '400px', width: '100%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="surename">Surename:</label>
          <input
            type="text"
            id="surename"
            value={surename}
            placeholder="Enter Your surename"
            onChange={(e) => setSurename(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="contactNo">Contact Number:</label>
          <input
            type="text"
            id="contactNo"
            value={contactNo}
            maxLength={10}
            placeholder="Enter Your Contact No"
            onChange={(e) => setContactNo(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            placeholder="Enter Your Address"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="pinCode">Pin Code:</label>
          <input
            type="text"
            id="pinCode"
            value={pinCode}
            placeholder="Enter Pin Code"
            onChange={(e) => setPinCode(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {editItem ? 'Update' : 'Submit'}
        </button>
      </form>

      <p>{message}</p>

      <button
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={fetchData}
      >
        Fetch Data
      </button>

      <div style={{ maxWidth: '800px', width: '100%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)' }}>
      <h2>Fetched Data:</h2>
      <ul>
        {fetchedData.map((item) => (
          <li key={item.id}>
              Name: {item.name}, Surename: {item.surename}, Contact: {item.contactNo}, Address: {item.address}, PinCode: {item.pinCode}

            <button onClick={() => openEditModal(item)} style={buttonStyles}>edit</button>
            <button onClick={() => handleDeleteClick(item.name)} style={buttonStyles}>delete</button>
          </li>
        ))}
      </ul>
    </div>

    {isEditModalOpen && (
      <EditModal
        item={editingItem}
        onSave={handleEditSave}
        onClose={closeEditModal}
        setMessage={setMessage}
      />
    )}

    </div>
  );
}

export default Home;

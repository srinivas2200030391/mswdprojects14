import React, { useState,useRef } from 'react'
import './profile.css'
import Header from '../../DashComponents/Header';
export default function UpdateProfile() 
{
    const [formData, setFormData] = useState({
        file: null
      });
     
      const fileInputRef = useRef(null); // Ref for the file input element
    
      const [message, setMessage] = useState('');
      const [error, setError] = useState('');
    
    //   const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.id]: e.target.value });
    //   };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('file', formData.file);
    
            const response = await axios.post('http://localhost:2014/addprofile', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            if (response.status === 200) {
                setFormData({ file: null });
                fileInputRef.current.value = '';  // clear the input after successful upload
                setMessage(response.data);
                setError('');
            }
        } catch (error) {
            // Improve error handling here
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                // Handle cases where the error is not from a HTTP response
                setError('An unexpected error occurred');
            }
            setMessage('');
          
        } 
        
      };
    
      return (
        <div className='image-container'>
          <Header title="Update Profile Picture"/>
          {message ? <h4 align="center">{message}</h4> : null}
          {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div classN="imagefield">
              <label>Image</label>
              <input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} required />
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      );
    }

import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ existingContact = {}, updateCallback}) => {
  // State variables for form inputs
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [notes, setNotes] = useState(existingContact.notes || "");
  const [imageUrl, setImageUrl] = useState(existingContact.imageUrl || "");

  // Check if the form is used for updating an existing contact
  const updating = Object.entries(existingContact).length !== 0;

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with the form data
    const data = {
      firstName,
      lastName,
      email,
      notes,
      imageUrl
    };

    try {
      if (updating) {
        // Update an existing contact
        await axios.put(`http://localhost:8080/contacts/${existingContact.id}`, data);
      } else {
        // Create a new contact
        await axios.post("http://localhost:8080/contact", data);
      }
      // Trigger the update callback to refresh the contacts list
      updateCallback();
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        // If the server responded with a status other than 200 range
        alert(error.response.data.message);
      } else {
        // If the request was made but no response was received or some other error occurred
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div >
        <label htmlFor="notes" >Notes:</label>
        <input
          className='notes'
          type="notes"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="imageUrl">Upload Image:</label>
        <input
          type="imageUrl"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
      
    </form>
  );
};

export default ContactForm;
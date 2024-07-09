import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [notes, setNotes] = useState(existingContact.notes || "");
  const [profileImage, setProfileImage] = useState(null);

  const updating = Object.keys(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("notes", notes);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      if (updating) {
        await axios.put(`http://localhost:8080/contacts/${existingContact.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post("http://localhost:8080/contact", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      updateCallback();
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data.message);
      } else {
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
      <div>
        <label htmlFor="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="profileImage">Upload Image:</label>
        <input
          type="file"
          id="profileImage"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default ContactForm;

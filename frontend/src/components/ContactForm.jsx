import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  // State variables for form fields
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");
  const [notes, setNotes] = useState(existingContact.notes || "");
  const [profileImage, setProfileImage] = useState(null);

  // Determine if the form is in update mode (i.e., editing an existing contact)
  const updating = Object.keys(existingContact).length !== 0;

  /**
   * Handles form submission, either creating a new contact or updating an existing one.
   * @param {Object} e - The submit event object.
   */
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create a FormData object to handle file upload and form data
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("notes", notes);
    if (profileImage) {
      formData.append("profileImage", profileImage); // Append the file if selected
    }

    try {
      if (updating) {
        // If updating an existing contact, use PUT request
        await axios.put(`http://localhost:8080/contacts/${existingContact.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the content type for file uploads
          }
        });
      } else {
        // If creating a new contact, use POST request
        await axios.post("http://localhost:8080/contact", formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the content type for file uploads
          }
        });
      }
      updateCallback(); // Call the update callback to refresh the contact list
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data.message); // Display server-side error message
      } else {
        alert("An error occurred. Please try again."); // Display generic error message
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Input field for first name */}
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      {/* Input field for last name */}
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      {/* Input field for email */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {/* Input field for notes */}
      <div>
        <label htmlFor="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      {/* Input field for uploading profile image */}
      <div>
        <label htmlFor="profileImage">Upload Image:</label>
        <input
          type="file"
          id="profileImage"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />
      </div>
      {/* Submit button with dynamic text based on form mode */}
      <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
  );
};

export default ContactForm;

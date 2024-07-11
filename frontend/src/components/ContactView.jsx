import React from 'react';

const ContactView = ({ contact, closeModal }) => {
  return (
    <div className="contact-view">
      <h2>Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Notes:</strong> {contact.notes}</p>
      {contact.profileImagePath && (
        <div>
          <strong>Profile Image:</strong>
          <br />
          <img className = "contact-view-profile-pictures "src={`http://localhost:8080/${contact.profileImagePath}`} alt={`${contact.firstName} ${contact.lastName}`} />
        </div>
      )}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ContactView;

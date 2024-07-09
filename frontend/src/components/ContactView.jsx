import React from 'react';

const ContactView = ({ contact, closeModal }) => {
  return (
    <div className="contact-view">
      <h2>Contact Details</h2>
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Notes:</strong> {contact.notes}</p>
      {contact.imageUrl && <img src={contact.imageUrl} alt={`${contact.firstName} ${contact.lastName}`} />}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ContactView;

import React from 'react';

/**
 * Component for displaying the details of a contact in a view-only mode.
 * @param {Object} props - The component's props.
 * @param {Object} props.contact - The contact object containing details to be displayed.
 * @param {Function} props.closeModal - Function to close the contact view modal.
 * @returns {JSX.Element} - Rendered ContactView component.
 */
const ContactView = ({ contact, closeModal }) => {
  return (
    <div className="contact-view">
      <h2>Contact Details</h2>
      {/* Display contact details */}
      <p><strong>First Name:</strong> {contact.firstName}</p>
      <p><strong>Last Name:</strong> {contact.lastName}</p>
      <p><strong>Email:</strong> {contact.email}</p>
      <p><strong>Notes:</strong> {contact.notes}</p>
      
      {/* Display profile image if available */}
      {contact.profileImagePath && (
        <div>
          <strong>Profile Image:</strong>
          <br />
          <img
            className="contact-view-profile-pictures"
            src={`http://localhost:8080/${contact.profileImagePath}`} // Source for the profile image
            alt={`${contact.firstName} ${contact.lastName}`} // Alt text for the profile image
          />
        </div>
      )}
      
      {/* Button to close the modal */}
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default ContactView;

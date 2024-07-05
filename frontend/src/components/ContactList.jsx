import React from "react";

const ContactList = ({ contacts, updateCallback, setQuery }) => {
  // Function to delete a contact
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE"
      };
      // Send a delete request to the server
      const response = await fetch(`http://localhost:8080/contact/${id}`, options);
      // If the request is successful, update the contacts list
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1 className="center-top-text">Welcome!</h1>
      <h2 className="center-top-text">Leave your contact info!</h2>
      <h2>Contacts</h2>
      <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search contacts" />
      <table>
        <thead>
          <tr>
            
          
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <button className="contact-name-buttons">
                  {contact.firstName} {contact.lastName}
                </button>
              </td>
              <td>
            
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;

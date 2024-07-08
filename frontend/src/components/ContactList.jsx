import React, { useState} from "react";
import { ReactComponent as PlusSign } from '../images/PlusSign.svg';
import DropDownContact from "./ContactButtons";

const ContactList = ({ contacts, updateContact, updateCallback, setQuery, openCreateModal }) => {
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

  const [openDropdown, setOpenDropdown] = useState(null); // Initialize the state to null

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id); // Toggle the dropdown based on the clicked contact's id
  };

  return (
    <div>
      <h1 className="center-top-text">Welcome!</h1>
      <h2 className="center-top-text">Leave your contact info!</h2>
      <h2>Contacts</h2>
      <input className="search-create-section" type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search contacts" />
      <PlusSign className = "plus-sign" onClick={openCreateModal}></PlusSign>
      <table>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
           
              <div className = "menu-trigger">
              <button className="contact-name-buttons" onClick={() => toggleDropdown(contact.id)}>
                    {contact.firstName} {contact.lastName}
                  </button>
                </div>
                <div className={`dropdown-menu ${openDropdown === contact.id ? 'active' : 'inactive'}`}>
                <DropDownContact text = {"Edit"}  onClick={() => updateContact(contact)} />
                <DropDownContact text = {"Delete"} onClick={() => onDelete(contact.id)} />
                </div>
            

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

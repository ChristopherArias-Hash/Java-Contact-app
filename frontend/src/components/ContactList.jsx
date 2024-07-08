import React, { useState} from "react";
import { ReactComponent as PlusSign } from '../images/PlusSign.svg';
import DropDownContact from "./DropDownContact";

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

  const [open, setOpen] = useState(false)

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
              <div className = "dropdown-contianer">
              <div className = "menu-trigger">
                <button className="contact-name-buttons" onClick ={()=>{setOpen(!open)}}>
                  {contact.firstName} {contact.lastName}
                </button>
                </div>
                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                <DropDownContact text = {"Edit"}  onClick={() => updateContact(contact)} />
                <DropDownContact text = {"Delete"} onClick={() => onDelete(contact.id)} />
                </div>
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

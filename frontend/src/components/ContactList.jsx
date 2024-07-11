import React, { useState } from "react";
import { ReactComponent as PlusSign } from '../images/PlusSign.svg';
import DropDownContact from "./ContactButtons";

const ContactList = ({ contacts, updateContact, updateCallback, setQuery, openCreateModal, viewModal }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const onDelete = async (id) => {
    try {
      const options = { method: "DELETE" };
      const response = await fetch(`http://localhost:8080/contact/${id}`, options);
      if (response.ok) {
        updateCallback();
      } else {
        console.error(`Failed to delete contact with id ${id}`);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("An error occurred while deleting the contact. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="center-top-text">Welcome!</h1>
      <h2 className="center-top-text">Leave your contact info!</h2>
      <h2 className="center-top-text-contacts">Contacts</h2>
      <div className="search-and-plus">
      <input
        className="search-create-section"
        type="text"
        color = "red"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search contacts"
      />
      <PlusSign className="plus-sign" onClick={openCreateModal} />
      </div>
      {contacts.length > 0 ? (
        <table>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <div className="menu-trigger">
                    <button
                      className="contact-name-buttons"
                      onClick={() => toggleDropdown(contact.id)}
                    >
                      {contact.firstName} {contact.lastName}
                      {contact.profileImagePath && (
                        <img
                          className="contact-button-profile-pictures"
                          src={`http://localhost:8080/${contact.profileImagePath}`}
                          alt={`${contact.firstName} ${contact.lastName}`}
                        />
                      )}
                    </button>
                  </div>
                  {openDropdown === contact.id && (
                    <div className="dropdown-menu active">
                      <DropDownContact text="View" onClick={() => viewModal(contact)} />
                      <DropDownContact text="Edit" onClick={() => updateContact(contact)} />
                      <DropDownContact text="Delete" onClick={() => onDelete(contact.id)} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className ="no-contacts-text">No contacts available. Please add a new contact.</p>
      )}
    </div>
  );
};

export default ContactList;

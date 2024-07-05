import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import "./ContactApp.css";

function ContactApp() {
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  // Fetch contacts from the server when the component mounts
  useEffect(() => {
    loadContacts();
  }, []);

  // Fetch contacts data from the server
  const loadContacts = async () => {
    const result = await axios.get("http://localhost:8080/contacts");
    setContacts(result.data);
  };

  // Filter contacts based on the search query
  const getFilteredItems = (query, contacts) => {
    if (!query) {
      return contacts;
    }
    return contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Close the modal and reset currentContact state
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  // Open the modal for creating a new contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  // Open the modal for editing an existing contact
  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  // Callback function to update contacts after editing
  const onUpdate = () => {
    closeModal();
    loadContacts();
  };

  const filteredContacts = getFilteredItems(query, contacts);

  return (
    <>
      <div className="container">
        <div className="centered-contact">
          {/* ContactList component to display the list of contacts */}
          <ContactList 
            contacts={filteredContacts} 
            updateContact={openEditModal} 
            updateCallback={onUpdate} 
            setQuery={setQuery}
          />
          {/* Button to open the modal for creating a new contact */}
          <button className="submitButton" onClick={openCreateModal}>Create New Contact</button>
        </div>
      </div>
      {/* Modal for editing an existing contact */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      )}
    </>
  );
}

export default ContactApp;

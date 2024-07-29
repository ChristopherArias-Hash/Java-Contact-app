import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import ContactView from "../components/ContactView";
import "./ContactApp.css";

function ContactApp() {
  // State variables
  const [query, setQuery] = useState(""); // Search query for filtering contacts
  const [contacts, setContacts] = useState([]); // List of contacts
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state
  const [isViewMode, setIsViewMode] = useState(false); // Determines if the modal is in view mode
  const [currentContact, setCurrentContact] = useState({}); // The currently selected contact

  // Load contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Fetch contacts from the server
  const loadContacts = async () => {
    const result = await axios.get("http://localhost:8080/contacts");
    setContacts(result.data);
  };

  // Filter contacts based on the search query
  const getFilteredItems = (query, contacts) => {
    if (!query) {
      return contacts; // Return all contacts if no query
    }
    return contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Close the modal and reset states
  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewMode(false);
    setCurrentContact({});
  };

  // Open the create contact modal
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  // Open the edit contact modal
  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  // Open the view contact modal
  const openViewModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  // Callback to update contact list and close the modal
  const onUpdate = () => {
    closeModal();
    loadContacts();
  };

  // Get filtered contacts based on the search query
  const filteredContacts = getFilteredItems(query, contacts);

  return (
    <>
      <div className="container">
        <div className="centered-contact">
          <ContactList 
            contacts={filteredContacts} 
            updateContact={openEditModal} 
            updateCallback={onUpdate} 
            setQuery={setQuery} 
            openCreateModal={openCreateModal}
            viewModal={openViewModal}
          />
        </div>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            {isViewMode ? (
              <ContactView contact={currentContact} closeModal={closeModal} />
            ) : (
              <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ContactApp;

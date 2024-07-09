import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import ContactView from "../components/ContactView";
import "./ContactApp.css";

function ContactApp() {
  const [query, setQuery] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const result = await axios.get("http://localhost:8080/contacts");
    setContacts(result.data);
  };

  const getFilteredItems = (query, contacts) => {
    if (!query) {
      return contacts;
    }
    return contacts.filter(contact => 
      contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(query.toLowerCase())
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewMode(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const openViewModal = (contact) => {
    if (isModalOpen) return;
    setCurrentContact(contact);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    loadContacts();
  };

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

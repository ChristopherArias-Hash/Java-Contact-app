import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    // Function to delete a contact
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            // Send a delete request to the server
            const response = await fetch(`http://localhost:8080/contact/${id}`, options)
            // If the request is successful, update the contacts list
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <h1 className="center-top-text">Welcome!</h1>
            <h2 className="center-top-text">Leave your contact info!</h2>
            <h2>Contacts</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                               
                                {/* Button to update a contact */}
                                <button className="UDbuttons" onClick={() => updateContact(contact)}>Update</button>
                                {/* Button to delete a contact */}
                                <button  className="UDbuttons" onClick={() => onDelete(contact.id)}>Delete</button>
                               
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactList;

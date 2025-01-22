import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Edit, Trash } from "iconsax-react";

const Contact = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "+0987654321" },
    { id: 3, name: "Robert Brown", email: "robert.brown@example.com", phone: "+1122334455" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", phone: "+2233445566" },
    { id: 5, name: "Michael Wilson", email: "michael.wilson@example.com", phone: "+3344556677" },
    { id: 6, name: "Sarah Taylor", email: "sarah.taylor@example.com", phone: "+4455667788" },
  ]);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  // Add New Contact
  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      const newId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;
      setContacts([...contacts, { id: newId, ...newContact }]);
      setNewContact({ name: "", email: "", phone: "" });
      setShowModal(false);
    } else {
      alert("Please fill in all fields");
    }
  };

  // Edit Contact
  const handleEditContact = (contact) => {
    setNewContact({ name: contact.name, email: contact.email, phone: contact.phone });
    setIsEditing(true);
    setEditContactId(contact.id);
    setShowModal(true);
  };

  // Save Edited Contact
  const handleSaveEditedContact = () => {
    setContacts(contacts.map(contact => 
      contact.id === editContactId ? { ...contact, ...newContact } : contact
    ));
    setNewContact({ name: "", email: "", phone: "" });
    setIsEditing(false);
    setEditContactId(null);
    setShowModal(false);
  };

  // Delete Contact
  const handleDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  // Sort Contacts
  const handleSort = (e) => {
    setSortOption(e.target.value);
    setContacts([
      ...contacts.sort((a, b) => {
        if (a[e.target.value] < b[e.target.value]) return -1;
        if (a[e.target.value] > b[e.target.value]) return 1;
        return 0;
      }),
    ]);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  return (
    <div className="container my-5">
      {/* Controls: Sorting, Search, Add Contact */}
      <div className="d-flex justify-content-between mb-3 align-items-center p-2" style={{ borderRadius: '0' }}>
        <div className="d-flex gap-2 align-items-center">
          <h5 className="form-label" style={{ width: 130, color: 'black' }}>Sort by:</h5>
          <select className="form-select" value={sortOption} onChange={handleSort}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            {/* <option value="email">Email</option> */}
          </select>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* <button
          className="btn"
          style={{ backgroundColor: '#13498a', color: 'white' }}
          onClick={() => { setShowModal(true); setIsEditing(false); setNewContact({ name: "", email: "", phone: "" }) }}
        >
          Add Contact
        </button> */}
      </div>

      {/* Contacts Table */}
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center" style={{ backgroundColor: '#13498a', color: 'white' }}>ID</th>
            <th className="text-center" style={{ backgroundColor: '#13498a', color: 'white' }}>Name</th>
            <th className="text-center" style={{ backgroundColor: '#13498a', color: 'white' }}>Phone</th>
            <th className="text-center" style={{ backgroundColor: '#13498a', color: 'white' }}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.phone}</td>
                <td>
                  <Edit size="20" color="black" onClick={() => handleEditContact(contact)} style={{ cursor: 'pointer' }} />
                  <Trash size="20" color="black" onClick={() => handleDelete(contact.id)} style={{ marginLeft: 20, cursor: 'pointer' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No contacts available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Add/Edit Contact */}
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditing ? 'Edit Contact' : 'Add New Contact'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column gap-2">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                />
                {/* <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  value={newContact.email}
                  onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                /> */}
                <input
                  type="text"
                  placeholder="Phone"
                  className="form-control"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Close
              </button>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: '#13498a', color: 'white' }}
                onClick={isEditing ? handleSaveEditedContact : handleAddContact}
              >
                {isEditing ? 'Save Changes' : 'Add Contact'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

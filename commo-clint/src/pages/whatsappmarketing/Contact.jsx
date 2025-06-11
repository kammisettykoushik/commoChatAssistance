import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Edit, Trash } from "iconsax-react";
import axios from "axios";

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", phone: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContactId, setEditContactId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch contacts from the backend
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("/api/whatsappmarketing/contacts",
          {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
        setContacts(response.data);
      } catch (error) {
        setError("Failed to load contacts. Please try again.");
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Add New Contact
  const handleAddContact = async () => {
    if (newContact.name && newContact.phone) {
      try {
        const response = await axios.post("/api/whatsappmarketing/contacts", newContact);
        setContacts([...contacts, response.data]);
        setNewContact({ name: "", phone: "" });
        setShowModal(false);
      } catch (error) {
        console.error("Error adding contact:", error);
        alert("Failed to add contact. Please try again.");
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  // Edit Contact
  const handleEditContact = (contact) => {
    setNewContact({ name: contact.name, phone: contact.phone });
    setIsEditing(true);
    setEditContactId(contact.id);
    setShowModal(true);
  };

  // Save Edited Contact
  const handleSaveEditedContact = async () => {
    try {
      const response = await axios.put(`/api/whatsappmarketing/contacts/${editContactId}`, newContact);
      const updatedContacts = contacts.map((contact) =>
        contact.id === editContactId ? response.data : contact
      );
      setContacts(updatedContacts);
      setNewContact({ name: "", phone: "" });
      setIsEditing(false);
      setEditContactId(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving edited contact:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  // Delete Contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/whatsappmarketing/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };

  // Sort Contacts
  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);
    const sortedContacts = [...contacts].sort((a, b) => {
      if (a[option] < b[option]) return -1;
      if (a[option] > b[option]) return 1;
      return 0;
    });
    setContacts(sortedContacts);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery)
  );

  return (
    <div style={{backgroundColor:'#FFF8EF',padding:5}}>
    <div className="container my-5">
      {/* Controls: Sorting, Search, Add Contact */}
      <div className="d-flex justify-content-between mb-3 align-items-center p-2" style={{ borderRadius: "0" }}>
        <div className="d-flex gap-2 align-items-center">
          <h5 className="form-label" style={{ width: 130, color: "black" }}>
            Sort by:
          </h5>
          <select className="form-select" value={sortOption} onChange={handleSort}>
            <option value="id">ID</option>
            <option value="name">Name</option>
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

        <button
          className="btn"
          style={{ backgroundColor: "#13498a", color: "white" }}
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setNewContact({ name: "", phone: "" });
          }}
        >
          Add Contact
        </button>
      </div>

      {/* Contacts Table */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th className="text-center" style={{ backgroundColor: "#13498a", color: "white" }}>
                ID
              </th>
              <th className="text-center" style={{ backgroundColor: "#13498a", color: "white" }}>
                Name
              </th>
              <th className="text-center" style={{ backgroundColor: "#13498a", color: "white" }}>
                Phone
              </th>
              <th className="text-center" style={{ backgroundColor: "#13498a", color: "white" }}>
                Actions
              </th>
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
                    <Edit
                      size="20"
                      color="black"
                      onClick={() => handleEditContact(contact)}
                      style={{ cursor: "pointer" }}
                    />
                    <Trash
                      size="20"
                      color="black"
                      onClick={() => handleDelete(contact.id)}
                      style={{ marginLeft: 20, cursor: "pointer" }}
                    />
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
      )}

      {/* Modal for Add/Edit Contact */}
      <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isEditing ? "Edit Contact" : "Add New Contact"}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
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
                style={{ backgroundColor: "#13498a", color: "white" }}
                onClick={isEditing ? handleSaveEditedContact : handleAddContact}
              >
                {isEditing ? "Save Changes" : "Add Contact"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;
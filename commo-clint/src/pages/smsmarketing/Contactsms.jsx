import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, Edit } from "iconsax-react";
import { saveAs } from 'file-saver';

const Contactsms = () => {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(10);
  const [editingContact, setEditingContact] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({
    name: '',
    mobile: '',
    email: '',
    from: '',
    creationDate: '',
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/smsmarketing/campaignsms`)
      .then((response) => response.json())
      .then((data) => {
        const mappedContacts = data.map(item => ({
          id: item.id,
          name: `${item.firstName} ${item.lastName}`,
          mobile: item.phoneNumber,
          email: item.email,
          from: item.countryName,
          creationDate: item.createdAt?.split('T')[0] // trim timestamp
        }));
        setContacts(mappedContacts);
      })
      .catch((error) => {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      });
  }, []);
  

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setUpdatedContact(contact);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setUpdatedContact({
      name: '',
      mobile: '',
      email: '',
      from: '',
      creationDate: '',
    });
  };

  const handleUpdateContact = async () => {
    const [firstName, ...rest] = updatedContact.name.split(" ");
    const lastName = rest.join(" ");
    
    const backendData = {
      firstName,
      email: updatedContact.email,
      phoneNumber: updatedContact.mobile,
      countryName: updatedContact.from,
      
      // optionally add these if you include them in the form
      displayName: updatedContact.displayName || `${firstName} ${lastName}`,
    };
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/smsmarketing/campaignsms/${editingContact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      });
  
      if (!response.ok) throw new Error("Failed to update contact");
  
      // Update UI
      const updatedContacts = contacts.map(contact =>
        contact.id === editingContact.id
          ? { ...updatedContact }
          : contact
      );
      setContacts(updatedContacts);
      handleCloseModal();
    } catch (error) {
      console.error("Update error:", error);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/smsmarketing/campaignsms/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) throw new Error("Failed to delete contact");
  
      // Remove from frontend state
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    }
  };
  
  // const handleDelete = (id) => {
  //   setContacts(contacts.filter(contact => contact.id !== id));
  // };


  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const importedData = JSON.parse(event.target.result);
        setContacts(importedData);
      };
      reader.readAsText(file);
    }
  };


  const handleExport = () => {
    const fileBlob = new Blob([JSON.stringify(contacts)], { type: 'application/json' });
    saveAs(fileBlob, 'contacts.json');
  };

  return (
    <div style={{ backgroundColor: '#EAF6FE', padding: 5 }}>
 changes     <div className="m-4">

        <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
          <h2>Contact List</h2>
          <div className="d-flex">
            <input
              type="file"
              id="importFile"
              accept=".json"
              className="me-3"
              style={{ display: 'none' }}
              onChange={handleImport}
            />
            <Button onClick={() => document.getElementById('importFile').click()} className="btn btn-primary me-3">Import</Button>
            <Button onClick={handleExport} className="btn btn-success">Export</Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Contact Name</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>From</th>
              <th>Creation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.mobile}</td>
                <td>{contact.email}</td>
                <td>{contact.from}</td>
                <td>{contact.creationDate}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(contact)}
                    style={{ padding: '5px' }}
                  >
                    <Edit size={25} color="black" />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(contact.id)}
                    style={{ padding: '5px' }}
                  >
                    <Trash size={25} color="black" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="d-flex justify-content-center">
          <Pagination>
            {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
        <Modal show={showEditModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label>Contact Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedContact.name}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Mobile Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedContact.mobile}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, mobile: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={updatedContact.email}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, email: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>From</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedContact.from}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, from: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label>Creation Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={updatedContact.creationDate}
                  onChange={(e) => setUpdatedContact({ ...updatedContact, creationDate: e.target.value })}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateContact}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Contactsms;

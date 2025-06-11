import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Modal, Pagination } from "react-bootstrap";

const CampaignContacts = () => {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  // Fetch contacts for the campaign
  useEffect(() => {
    const fetchCampaignContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/emailmarketing/campaigns/${campaignId}/contacts`
        );
        console.log('Fetched Contacts:', response.data); // Log fetched data
        setContacts(response.data);
      } catch (err) {
        console.error('Error fetching campaign contacts:', err);
      }
    };

    fetchCampaignContacts();
  }, [campaignId]);

  // Toggle selection of contacts
  const toggleSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Delete selected contacts
  const handleDeleteSelected = async () => {
    try {
      const updatedContacts = contacts.filter(
        (contact) => !selectedContacts.includes(contact.email)
      );
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/emailmarketing/campaigns/${campaignId}/contacts`,
        { contacts: updatedContacts }
      );
      setContacts(updatedContacts);
      setSelectedContacts([]);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error deleting contacts:', err);
    }
  };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Campaign Contacts</h4>
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        Back to Campaigns
      </Button>

      {/* Contacts Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className="text-center">
              <input type="checkbox" />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentContacts.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No contacts found.</td>
            </tr>
          ) : (
            currentContacts.map((contact) => (
              <tr key={contact.email}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.email)}
                    onChange={() => toggleSelection(contact.email)}
                  />
                </td>
                <td>{contact.firstname}</td>
                <td>{contact.lastname}</td>
                <td>{contact.email}</td>
                <td>
                  <span className={`badge ${
                    contact.status === 'Completed'
                      ? 'bg-success'
                      : contact.status === 'Pending'
                      ? 'bg-warning'
                      : 'bg-danger'
                  }`}>
                    {contact.status || 'Pending'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <Pagination>
        <Pagination.Prev
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        />
        {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            currentPage < Math.ceil(contacts.length / contactsPerPage) &&
            setCurrentPage(currentPage + 1)
          }
        />
      </Pagination>

      {/* Delete Selected Contacts */}
      {selectedContacts.length > 0 && (
        <div className="mt-4 d-flex justify-content-between align-items-center bg-light p-3 rounded">
          <p>{selectedContacts.length} contacts selected</p>
          <div>
            <Button variant="danger" onClick={() => setIsModalOpen(true)}>
              Delete
            </Button>
            <Button
              variant="secondary"
              style={{ marginLeft: 10 }}
              onClick={() => setSelectedContacts([])}
            >
              Unselect All
            </Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {selectedContacts.length} contacts?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteSelected}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CampaignContacts;
import React, { useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { Button, Modal, Dropdown, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage = () => {
  const [contacts, setContacts] = useState([
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", status: "Completed", date: "2025-02-07" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", status: "Pending", date: "2025-02-06" },
    { id: 3, firstName: "Alice", lastName: "Brown", email: "alice@example.com", status: "Not Completed", date: "2025-02-04" },
    { id: 4, firstName: "Bob", lastName: "Williams", email: "bob@example.com", status: "Completed", date: "2025-02-01" },
    { id: 5, firstName: "Charlie", lastName: "Davis", email: "charlie@example.com", status: "Completed", date: "2025-02-03" },
    { id: 6, firstName: "David", lastName: "Garcia", email: "david@example.com", status: "Pending", date: "2025-02-02" },
    { id: 7, firstName: "Eva", lastName: "Martinez", email: "eva@example.com", status: "Not Completed", date: "2025-01-30" },
    { id: 8, firstName: "Frank", lastName: "Lee", email: "frank@example.com", status: "Completed", date: "2025-01-29" },
    { id: 9, firstName: "Grace", lastName: "Hernandez", email: "grace@example.com", status: "Pending", date: "2025-01-28" },
    { id: 10, firstName: "Henry", lastName: "Lopez", email: "henry@example.com", status: "Not Completed", date: "2025-01-27" },
    { id: 11, firstName: "Isla", lastName: "Taylor", email: "isla@example.com", status: "Completed", date: "2025-01-26" },
    { id: 12, firstName: "Jack", lastName: "White", email: "jack@example.com", status: "Pending", date: "2025-01-25" },
    { id: 13, firstName: "Kim", lastName: "Moore", email: "kim@example.com", status: "Not Completed", date: "2025-01-24" },
    { id: 14, firstName: "Liam", lastName: "Martin", email: "liam@example.com", status: "Completed", date: "2025-01-23" },
    { id: 15, firstName: "Mia", lastName: "Jackson", email: "mia@example.com", status: "Pending", date: "2025-01-22" },
    { id: 16, firstName: "Noah", lastName: "Scott", email: "noah@example.com", status: "Completed", date: "2025-01-21" },
    { id: 17, firstName: "Olivia", lastName: "Adams", email: "olivia@example.com", status: "Pending", date: "2025-01-20" },
  ]);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  const toggleSelection = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setContacts(contacts.filter((contact) => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
    setIsModalOpen(false);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  // Date filtering logic
  const filterByDate = (contact) => {
    const currentDate = new Date();
    const contactDate = new Date(contact.date);
    const diffInTime = currentDate - contactDate;
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;

    switch (filter) {
      case "Today":
        return diffInTime < oneDay;
      case "Last Day":
        return diffInTime < 2 * oneDay;
      case "Last 7 Days":
        return diffInTime < sevenDays;
      default:
        return true; // No filter, show all contacts
    }
  };

  const filteredContacts = contacts
    .filter((contact) =>
      (contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
      filterByDate(contact)
    );

  // Pagination Logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  // Pagination Handler
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleExportClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv,.json";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        alert(`File selected: ${file.name}`);
      }
    };
    fileInput.click();
  };

  return (
    <div style={{ backgroundColor: ' #FFF8EF', padding: 5 }}>
      <div className="container mt-5">
        {/* Header Controls */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <h4 className="mr-4">Contacts ({filteredContacts.length})</h4>
          </div>

          <div className="d-flex align-items-center space-x-3 gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="form-control w-40"
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter Dropdown */}
            <Dropdown onSelect={handleFilterChange}>
              <Dropdown.Toggle variant="secondary" id="filter-dropdown">
                Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="Today">Today</Dropdown.Item>
                <Dropdown.Item eventKey="Last Day">Last Day</Dropdown.Item>
                <Dropdown.Item eventKey="Last 7 Days">Last 7 Days</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Export Button */}
            <Button variant="success" className="d-flex align-items-center" onClick={handleExportClick}>
              <FaFileExport className="mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <table className="table table-bordered" >
          <thead className="thead-light">
            <tr>
              <th className="text-center" style={{ backgroundColor: "#FDEE96" }}>
                <input type="checkbox" />
              </th>
              <th style={{ backgroundColor: "#FDEE96" }}>First Name</th>
              <th style={{ backgroundColor: "#FDEE96" }}>Last Name</th>
              <th style={{ backgroundColor: "#FDEE96" }}>Email</th>
              <th style={{ backgroundColor: "#FDEE96" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentContacts.map((contact) => (
              <tr
                key={contact.id}
                style={{
                  backgroundColor:
                    contact.status === "Completed"
                      ? "#d4edda"
                      : contact.status === "Pending"
                      ? "#fff3cd"
                      : "#f8d7da",
                }}
              >
                <td className="text-center" style={{backgroundColor:'#FFF7C8'}}>
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleSelection(contact.id)}
                  />
                </td>
                <td style={{backgroundColor:'#FFF7C8'}}>{contact.firstName}</td>
                <td style={{backgroundColor:'#FFF7C8'}}>{contact.lastName}</td>
                <td style={{backgroundColor:'#FFF7C8'}}>{contact.email}</td>
                <td style={{backgroundColor:'#FFF7C8'}}>
                  <span
                    className={`badge ${
                      contact.status === "Completed"
                        ? "bg-success"
                        : contact.status === "Pending"
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {contact.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
          {Array.from({ length: Math.ceil(filteredContacts.length / contactsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              currentPage < Math.ceil(filteredContacts.length / contactsPerPage) &&
              handlePageChange(currentPage + 1)
            }
          />
        </Pagination>

        {/* Delete Modal */}
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

        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {selectedContacts.length} contacts?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDeleteSelected}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ContactPage;

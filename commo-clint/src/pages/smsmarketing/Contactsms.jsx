// import React, { useState } from "react";
// import { Modal, Button, Table, Pagination } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Trash, Edit } from "iconsax-react"; // Importing icons from Iconsax
// import { saveAs } from 'file-saver'; // To handle file download

// const Contactsms = () => {
//   const [contacts, setContacts] = useState([
//     { id: 1, name: "John Doe", mobile: "+1234567890", email: "john.doe@example.com", from: "USA", creationDate: "2025-03-19" },
//     { id: 2, name: "Jane Smith", mobile: "+1987654321", email: "jane.smith@example.com", from: "Canada", creationDate: "2025-03-18" },
//     { id: 3, name: "Jack Brown", mobile: "+1122334455", email: "jack.brown@example.com", from: "UK", creationDate: "2025-03-17" },
//     { id: 4, name: "Emma White", mobile: "+9988776655", email: "emma.white@example.com", from: "Australia", creationDate: "2025-03-16" },
//     { id: 5, name: "Michael Green", mobile: "+5566778899", email: "michael.green@example.com", from: "USA", creationDate: "2025-03-15" },
//     { id: 6, name: "Sophia Black", mobile: "+1231231234", email: "sophia.black@example.com", from: "Germany", creationDate: "2025-03-14" },
//     { id: 7, name: "Liam Blue", mobile: "+9876543210", email: "liam.blue@example.com", from: "France", creationDate: "2025-03-13" },
//     { id: 8, name: "Olivia Red", mobile: "+2244668800", email: "olivia.red@example.com", from: "Italy", creationDate: "2025-03-12" },
//     { id: 9, name: "Ava Yellow", mobile: "+7788991122", email: "ava.yellow@example.com", from: "Spain", creationDate: "2025-03-11" },
//     { id: 10, name: "Isabella Orange", mobile: "+2233445566", email: "isabella.orange@example.com", from: "USA", creationDate: "2025-03-10" },
//     { id: 11, name: "Mason Purple", mobile: "+3322114455", email: "mason.purple@example.com", from: "UK", creationDate: "2025-03-09" },
//     { id: 12, name: "Charlotte Pink", mobile: "+5566777788", email: "charlotte.pink@example.com", from: "Canada", creationDate: "2025-03-08" },
//     { id: 13, name: "Ethan Gold", mobile: "+9888776655", email: "ethan.gold@example.com", from: "India", creationDate: "2025-03-07" },
//     { id: 14, name: "Avery Silver", mobile: "+1122339988", email: "avery.silver@example.com", from: "Australia", creationDate: "2025-03-06" },
//     { id: 15, name: "Amelia Grey", mobile: "+8877665544", email: "amelia.grey@example.com", from: "USA", creationDate: "2025-03-05" },
//     { id: 16, name: "Carter Blue", mobile: "+1234567890", email: "carter.blue@example.com", from: "France", creationDate: "2025-03-04" },
//     { id: 17, name: "Mila Brown", mobile: "+7778889990", email: "mila.brown@example.com", from: "Italy", creationDate: "2025-03-03" },
//     { id: 18, name: "Lucas Green", mobile: "+4433221100", email: "lucas.green@example.com", from: "Germany", creationDate: "2025-03-02" },
//     { id: 19, name: "Madison White", mobile: "+5566778899", email: "madison.white@example.com", from: "Spain", creationDate: "2025-03-01" },
//     { id: 20, name: "Lily Black", mobile: "+9988776655", email: "lily.black@example.com", from: "USA", creationDate: "2025-02-28" },
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [contactsPerPage] = useState(10);
//   const [editingContact, setEditingContact] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [updatedContact, setUpdatedContact] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     from: '',
//     creationDate: '',
//   });

//   // Get current contacts based on pagination
//   const indexOfLastContact = currentPage * contactsPerPage;
//   const indexOfFirstContact = indexOfLastContact - contactsPerPage;
//   const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

//   // Handle page change
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Handle edit button click
//   const handleEdit = (contact) => {
//     setEditingContact(contact);
//     setUpdatedContact(contact); // Populate form with current contact data
//     setShowEditModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowEditModal(false);
//     setUpdatedContact({
//       name: '',
//       mobile: '',
//       email: '',
//       from: '',
//       creationDate: '',
//     });
//   };

//   const handleUpdateContact = () => {
//     const updatedContacts = contacts.map(contact =>
//       contact.id === editingContact.id ? updatedContact : contact
//     );
//     setContacts(updatedContacts);
//     handleCloseModal();
//   };

//   const handleDelete = (id) => {
//     setContacts(contacts.filter(contact => contact.id !== id));
//   };

//   // Import handler
//   const handleImport = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         const importedData = JSON.parse(event.target.result);
//         setContacts(importedData);
//       };
//       reader.readAsText(file);
//     }
//   };

//   // Export handler
//   const handleExport = () => {
//     const fileBlob = new Blob([JSON.stringify(contacts)], { type: 'application/json' });
//     saveAs(fileBlob, 'contacts.json');
//   };

//   return (
//     <div style={{ backgroundColor: '#EAF6FE', padding: 5 }}>
//       <div className="m-4">
//         {/* Flexbox container for title and buttons */}
//         <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
//           <h2>Contact List</h2>
//           <div className="d-flex">
//             <input
//               type="file"
//               id="importFile"
//               accept=".json"
//               className="me-3"
//               style={{ display: 'none' }}
//               onChange={handleImport}
//             />
//             <Button onClick={() => document.getElementById('importFile').click()} className="btn btn-primary me-3">Import</Button>
//             <Button onClick={handleExport} className="btn btn-success">Export</Button>
//           </div>
//         </div>

//         {/* Table */}
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Contact Name</th>
//               <th>Mobile Number</th>
//               <th>Email</th>
//               <th>From</th>
//               <th>Creation Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentContacts.map((contact) => (
//               <tr key={contact.id}>
//                 <td>{contact.name}</td>
//                 <td>{contact.mobile}</td>
//                 <td>{contact.email}</td>
//                 <td>{contact.from}</td>
//                 <td>{contact.creationDate}</td>
//                 <td>
//                   <Button
//                     variant="warning"
//                     className="me-2"
//                     onClick={() => handleEdit(contact)}
//                     style={{ padding: '5px' }}
//                   >
//                     <Edit size={25} color="black" />
//                   </Button>
//                   <Button
//                     variant="danger"
//                     onClick={() => handleDelete(contact.id)}
//                     style={{ padding: '5px' }}
//                   >
//                     <Trash size={25} color="black" />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center">
//           <Pagination>
//             {Array.from({ length: Math.ceil(contacts.length / contactsPerPage) }, (_, index) => (
//               <Pagination.Item
//                 key={index + 1}
//                 active={index + 1 === currentPage}
//                 onClick={() => paginate(index + 1)}
//               >
//                 {index + 1}
//               </Pagination.Item>
//             ))}
//           </Pagination>
//         </div>

//         {/* Edit Contact Modal */}
//         <Modal show={showEditModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Contact</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <div className="mb-3">
//                 <label>Contact Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={updatedContact.name}
//                   onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>Mobile Number</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={updatedContact.mobile}
//                   onChange={(e) => setUpdatedContact({ ...updatedContact, mobile: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   value={updatedContact.email}
//                   onChange={(e) => setUpdatedContact({ ...updatedContact, email: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>From</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={updatedContact.from}
//                   onChange={(e) => setUpdatedContact({ ...updatedContact, from: e.target.value })}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label>Creation Date</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={updatedContact.creationDate}
//                   onChange={(e) => setUpdatedContact({ ...updatedContact, creationDate: e.target.value })}
//                 />
//               </div>
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleUpdateContact}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Contactsms;

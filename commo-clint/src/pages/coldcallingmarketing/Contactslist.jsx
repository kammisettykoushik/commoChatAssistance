import React, { useState } from "react";
import { Table, Button, Form, Modal, Card } from "react-bootstrap";
import { Edit, Trash, Upload, Download } from "lucide-react";

const ContactsList = () => {
    const [contacts, setContacts] = useState([
        { id: 1, name: "John Doe", mobile: "1234567890", date: "2024-02-19" },
        { id: 2, name: "Jane Smith", mobile: "9876543210", date: "2024-02-18" },
        { id: 3, name: "Alice Brown", mobile: "5556667777", date: "2024-02-17" },
        { id: 4, name: "Bob Johnson", mobile: "4445556666", date: "2024-02-16" }
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editContact, setEditContact] = useState(null);

    const handleEdit = (contact) => {
        setEditContact(contact);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    setContacts(data);
                } catch (error) {
                    alert("Invalid file format");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(contacts, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "contacts.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const handleSave = () => {
        setContacts(contacts.map(c => (c.id === editContact.id ? editContact : c)));
        setShowModal(false);
    };

    return (

        <div className="p-4">
            {contacts.length === 0 ? (
                <Card className="p-4 text-center bg-light shadow-sm w-50 mx-auto">
                    <h3>No Contacts Available</h3>
                    <Form.Group className="mt-3 d-flex justify-content-center">
                        <Form.Label className="btn btn-sm btn-primary d-flex align-items-center gap-2 m-0">
                            <Upload size={14} /> Import Contacts
                            <Form.Control type="file" accept=".json" onChange={handleImport} hidden />
                        </Form.Label>
                    </Form.Group>
                </Card>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-xl font-bold">Contact List</h2>
                        <div className="d-flex gap-2">
                            <Form.Group>
                                <Form.Label className="btn btn-sm btn-primary d-flex align-items-center gap-2 m-0">
                                    <Upload size={14} /> Import
                                    <Form.Control type="file" accept=".json" onChange={handleImport} hidden />
                                </Form.Label>
                            </Form.Group>
                            <Button onClick={handleExport} variant="success" className="btn-sm d-flex align-items-center gap-2">
                                <Download size={14} /> Export
                            </Button>
                        </div>
                    </div>
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile Number</th>
                                <th>Creation Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.mobile}</td>
                                    <td>{contact.date}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <Button onClick={() => handleEdit(contact)} variant="warning" className="btn-sm d-flex align-items-center gap-1">
                                            <Edit size={14} /> Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(contact.id)} variant="danger" className="btn-sm d-flex align-items-center gap-1">
                                            <Trash size={14} /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={editContact?.name || ""}
                                onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={editContact?.mobile || ""}
                                onChange={(e) => setEditContact({ ...editContact, mobile: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ContactsList;

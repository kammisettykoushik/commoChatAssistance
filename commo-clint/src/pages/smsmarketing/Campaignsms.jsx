// import React, { useState } from "react";
// import { Form, Button, Row, Col, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Campaignsms = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         phoneNumber: "",
//         displayName: "",
//         address: "",
//         countryName: "",
//         companyName: "",
//     });

//     const [errors, setErrors] = useState({});
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [description, setDescription] = useState("");
//     const [showModal, setShowModal] = useState(false);


//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "phoneNumber") {
//             if (!/^\d*$/.test(value)) return;
//             if (value.length > 10) return;
//         } else if (["firstName", "lastName", "displayName", "address", "countryName", "companyName"].includes(name)) {
//             if (!/^[a-zA-Z ]*$/.test(value)) return;
//         }

//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };



//     const handleSaves = () => {
//         // Open the modal when save is clicked
//         setShowModal(true);
//     };

//     const handleCloseModal = () => {
//         // Close the modal when done is clicked
//         setShowModal(false);
//         navigate("/smsmarketing/Automationssms");
//     };

//     const handleSave = () => {
//         let newErrors = {};

//         if (formData.firstName.length < 2) newErrors.firstName = "First Name must be at least 2 characters.";
//         if (formData.lastName.length < 2) newErrors.lastName = "Last Name must be at least 2 characters.";
//         if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter a valid email address.";
//         if (formData.phoneNumber.length !== 10) newErrors.phoneNumber = "Phone Number must be exactly 10 digits.";
//         if (formData.displayName.length < 2) newErrors.displayName = "Display Name must be at least 2 characters.";
//         if (formData.address.length < 2) newErrors.address = "Address must be at least 2 characters.";
//         if (formData.countryName.length < 2) newErrors.countryName = "Country Name must be at least 2 characters.";
//         if (formData.companyName.length < 2) newErrors.companyName = "Company Name must be at least 2 characters.";

//         setErrors(newErrors);

//         if (Object.keys(newErrors).length === 0) {
//             setIsSubmitted(true);
//         }
//     };

//     return (
//         <div style={{ backgroundColor: '#EAF6FE', padding: 5 }}>
//             <div className="container mt-4">
//                 {isSubmitted ? (
//                     <><h2>Create a Campaign</h2><div className="container-fluid p-5" style={{ borderRadius: "8px", backgroundColor: 'white' }}>
//                         <h2>Campaign Information</h2>
//                         <div className="row mt-4">
//                             {/* Input Fields Section */}
//                             <div className="col-md-8">
//                                 <div className="d-flex flex-wrap gap-4">
//                                     {/* First input row (3 fields in one line) */}
//                                     <div className="d-flex flex-column col-4">
//                                         <Form.Group>
//                                             <Form.Label>CAMPAIGN PAGE NAME</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter campaign page name"
//                                                 style={{ backgroundColor: "#B7E0FF" }} />
//                                         </Form.Group>
//                                     </div>

//                                     <div className="d-flex flex-column col-4">
//                                         <Form.Group>
//                                             <Form.Label>CAMPAIGN FROM</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 placeholder="Enter campaign from"
//                                                 style={{ backgroundColor: "#B7E0FF" }} />
//                                         </Form.Group>
//                                     </div>

//                                     <div className="d-flex flex-column col-4">
//                                         <Form.Group>
//                                             <Form.Label>CONTACT LIST</Form.Label>
//                                             <Form.Select style={{ backgroundColor: "#B7E0FF" }}>
//                                                 <option>Select contacts</option>
//                                                 <option>Contact 1</option>
//                                                 <option>Contact 2</option>
//                                                 <option>Contact 3</option>
//                                             </Form.Select>
//                                         </Form.Group>
//                                     </div>

//                                     {/* Second input row (1 field in one line) */}
//                                     <div className="d-flex flex-column col-6">
//                                         <Form.Group>
//                                             <Form.Label>SEND CAMPAIGN ON</Form.Label>
//                                             <Form.Control
//                                                 type="date"
//                                                 style={{ backgroundColor: "#B7E0FF", width: 230 }} />
//                                         </Form.Group>
//                                     </div>

//                                     {/* Description Field */}
//                                     <Form.Group>
//                                         <Form.Label>DESCRIPTION VIEW</Form.Label>
//                                         <Form.Control
//                                             as="textarea"
//                                             placeholder="Enter description"
//                                             rows={3}
//                                             style={{ backgroundColor: "#B7E0FF", width: 480 }}
//                                             onChange={(e) => setDescription(e.target.value)} />
//                                     </Form.Group>
//                                 </div>

//                                 {/* Button Section */}
//                                 <div className="d-flex justify-content-start mt-4 gap-3">
//                                     <Button variant="secondary border-dark" style={{ backgroundColor: 'white', color: 'black', width: 100 }}>Cancel</Button>
//                                     <Button variant="primary" onClick={handleSaves} style={{ backgroundColor: '#0070C0', color: 'white', width: 100 }}>
//                                         Save
//                                     </Button>
//                                 </div>

//                             </div>


//                             <Modal show={showModal} onHide={handleCloseModal} centered>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Commo</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <p>Your campaign has been successfully launched.</p>
//                                 </Modal.Body>
//                                 <Modal.Footer>
//                                     <Button variant="secondary" onClick={handleCloseModal}>Done</Button>
//                                 </Modal.Footer>
//                             </Modal>
//                             {/* Preview Section */}

//                             <div style={{ flex: 1, padding: "20px", backgroundColor: "#B7E0FF", borderRadius: "8px", color: "black", height: '400px', overflowY: 'auto' }}>
//                                 <h2>Preview</h2>

//                                 {/* First line: "Commo" */}
//                                 <span style={{ fontWeight: 'bold', fontSize: '16px', display: 'inline-block' }}>Commo</span>

//                                 {/* Second line: "Text Message" */}
//                                 <p style={{ color: 'gray', fontSize: '14px', marginTop: '10px' }}>Text Message</p>

//                                 {/* Third line: "Today 12:41 P.M" */}
//                                 <p style={{ color: 'gray', fontSize: '12px', marginTop: '5px' }}>Today 12:41 P.M</p>

//                                 {/* Fourth line: Description inside a styled div */}
//                                 <div style={{
//                                     whiteSpace: 'normal',
//                                     wordWrap: 'break-word',
//                                     overflow: 'hidden',
//                                     width: '100%',
//                                 }}>
//                                     <p style={{ backgroundColor: '#0070C0', padding: 10, borderRadius: 19, color: 'white' }}>{description}</p>
//                                 </div>
//                             </div>


//                         </div>
//                     </div></>


//                 ) : (
//                     <div className="d-flex justify-content-between">
//                         <div
//                             className="d-flex"
//                             style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "100%" }}
//                         >
//                             <div style={{ flex: 1, marginRight: "10px" }}>
//                                 <h2>Contact Information</h2>
//                                 <Form>
//                                     <Row className="mb-3">
//                                         {[{ label: "First Name", name: "firstName" },
//                                         { label: "Last Name", name: "lastName" },
//                                         { label: "Email", name: "email", type: "email" },
//                                         { label: "Phone Number", name: "phoneNumber" }
//                                         ].map(({ label, name, type = "text" }) => (
//                                             <Col sm={12} className="mb-2" key={name}>
//                                                 <Form.Group>
//                                                     <Form.Label>{label}</Form.Label>
//                                                     <Form.Control
//                                                         type={type}
//                                                         name={name}
//                                                         value={formData[name]}
//                                                         onChange={handleInputChange}
//                                                         style={{ backgroundColor: "#B7E0FF" }}
//                                                     />
//                                                     {errors[name] && <small className="text-danger">{errors[name]}</small>}
//                                                 </Form.Group>
//                                             </Col>
//                                         ))}
//                                     </Row>
//                                 </Form>

//                                 <div className="d-flex justify-content-start mt-4 gap-3">
//                                     <Button variant="secondary border-dark" style={{ backgroundColor: 'white', color: 'black', width: 100 }}>Cancel</Button>
//                                     <Button variant="primary" onClick={handleSave} style={{ backgroundColor: '#0070C0', color: 'white', width: 100 }}>Save</Button>
//                                 </div>
//                             </div>
//                             <div style={{ flex: 1, marginRight: "10px", marginTop: 45 }}>
//                                 <Form>
//                                     <Row className="mb-3">
//                                         {[{ label: "Display Name", name: "displayName" },
//                                         { label: "Address", name: "address" },
//                                         { label: "Country Name", name: "countryName" },
//                                         { label: "Company Name", name: "companyName" }
//                                         ].map(({ label, name }) => (
//                                             <Col sm={12} className="mb-2" key={name}>
//                                                 <Form.Group>
//                                                     <Form.Label>{label}</Form.Label>
//                                                     <Form.Control
//                                                         type="text"
//                                                         name={name}
//                                                         value={formData[name]}
//                                                         onChange={handleInputChange}
//                                                         style={{ backgroundColor: "#B7E0FF" }}
//                                                     />
//                                                     {errors[name] && <small className="text-danger">{errors[name]}</small>}
//                                                 </Form.Group>
//                                             </Col>
//                                         ))}
//                                     </Row>
//                                 </Form>
//                             </div>
//                             <div style={{ flex: 1, padding: "20px", backgroundColor: "#B7E0FF", borderRadius: "8px", color: "black" }}>
//                                 <h5>Description Information</h5>
//                                 {Object.entries(formData).map(([key, value]) => (
//                                     <p key={key}><strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value}</p>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Campaignsms;

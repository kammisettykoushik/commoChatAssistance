import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const WhatsAppContactList = () => {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  // Fetch templates from the API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates`);
        setTemplates(response.data);
      } catch (err) {
        console.error("Error fetching templates:", err);
      }
    };

    fetchTemplates();
  }, []);

  // Navigate to the template contacts screen using the slug
  const handleTemplateClick = (slug) => {
    navigate(`/whatsappmarketing/templates/${slug}/contacts`);
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">WhatsApp Templates</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.templateName}</td>
              <td>
                <Button variant="primary" onClick={() => handleTemplateClick(template.slug)}>
                  View Contacts
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WhatsAppContactList;

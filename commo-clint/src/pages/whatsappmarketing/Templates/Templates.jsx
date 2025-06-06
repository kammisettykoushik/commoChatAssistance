import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Copy, UserEdit, Trash } from 'iconsax-react';
import axios from 'axios';
import Papa from 'papaparse';
import { read, utils } from 'xlsx';

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newName, setNewName] = useState('');
  const [newUpdatedDate, setNewUpdatedDate] = useState('');
  const [newModifiedDate, setNewModifiedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates`);
        console.log('Fetched templates:', response.data); // Debug log
        setTemplates(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Failed to load templates');
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleCopy = (id) => {
    const template = templates.find((t) => t.id === id);
    navigator.clipboard.writeText(template.templateName);
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setNewName(template.templateName);
    setNewUpdatedDate(template.timestamp.split('T')[0]);
    setNewModifiedDate(template.modifiedDate ? template.modifiedDate.split('T')[0] : template.timestamp.split('T')[0]);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedTemplate = {
        ...editingTemplate,
        templateName: newName,
        timestamp: newUpdatedDate,
        modifiedDate: newModifiedDate,
        status: editingTemplate.status,
      };
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${editingTemplate.id}`,
        updatedTemplate
      );
      setTemplates(templates.map((t) => (t.id === editingTemplate.id ? response.data : t)));
      setEditingTemplate(null);
    } catch (err) {
      console.error('Error saving edit:', err);
      alert('Failed to save changes');
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${slug}`);
        setTemplates(templates.filter((t) => t.slug !== slug));
      } catch (err) {
        console.error('Error deleting template:', err.response?.data || err.message);
        alert(`Failed to delete template: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const handleSubmit = async (id) => {
    try {
      const template = templates.find((t) => t.id === id);
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${id}`,
        { ...template, status: 'Approved', modifiedDate: new Date().toISOString() }
      );
      setTemplates(templates.map((t) => (t.id === id ? response.data : t)));
    } catch (err) {
      console.error('Error submitting template:', err);
      alert('Failed to submit template');
    }
  };

  const handleSend = async (id) => {
    const template = templates.find((t) => t.id === id);
    if (!template.contactsUrl) {
      alert('No contacts file found for this template');
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}${template.contactsUrl}`, {
        responseType: 'arraybuffer',
      });
      const ext = template.contactsUrl.split('.').pop().toLowerCase();
      let contacts = [];

      if (ext === 'csv') {
        const text = new TextDecoder().decode(response.data);
        contacts = await new Promise((resolve, reject) => {
          Papa.parse(text, {
            header: true,
            complete: (results) => resolve(results.data),
            error: (err) => reject(err),
          });
        });
      } else if (ext === 'xlsx') {
        const workbook = read(response.data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        contacts = utils.sheet_to_json(sheet);
      }

      const phoneNumbers = contacts.map((contact) => contact['phone number']);
      if (!phoneNumbers.length) {
        alert('No phone numbers found in the contacts file');
        return;
      }

      const sendResults = await Promise.all(
        phoneNumbers.map(async (phone) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(`Simulated sending to ${phone}`);
            return { phone, status: 'Sent' };
          } catch (err) {
            return { phone, status: 'Failed', reason: err.message };
          }
        })
      );

      const newStatus = sendResults.every((r) => r.status === 'Sent') ? 'Sent' : 'Failed';
      const updatedTemplate = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${id}`,
        {
          ...template,
          status: newStatus,
          modifiedDate: new Date().toISOString(),
        }
      );

      setTemplates(templates.map((t) => (t.id === id ? updatedTemplate.data : t)));
      alert('Messages sent successfully!');
    } catch (err) {
      console.error('Error sending messages:', err);
      alert('Failed to send messages');
    }
  };

  const handleCreateNewTemplate = () => {
    navigate('/whatsappmarketing/Templates/SelectTemplate');
  };

  const handleSavedPreviewTemplate = () => {
    navigate('/whatsappmarketing/Templates/SavedPreview');
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#FFF8EF', padding: 10 }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          className="btn"
          onClick={handleSavedPreviewTemplate}
          style={{ backgroundColor: '#2b3f87', color: 'white' }}
        >
          View Saved Templates
        </button>
        <h3>Message Templates</h3>
        <button
          className="btn"
          onClick={handleCreateNewTemplate}
          style={{ backgroundColor: '#2b3f87', color: 'white' }}
        >
          Create New Template
        </button>
      </div>

    

{loading && <p>Loading templates...</p>}
{error && <p className="text-danger">{error}</p>}

{!loading && templates.length === 0 && (
  <p className="text-center text-muted">No templates available. Please create a new template.</p>
)}

{templates.length > 0 && (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>Template Name</th>
        <th>Updated Date</th>
        <th>Modified Date</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {templates.map((template) => (
        <tr key={template.id}>
          <td
            onClick={() => navigate('/whatsappmarketing/BroadCast')}
            style={{ cursor: 'pointer', color: '#2b3f87' }}
          >
            {template.templateName}
          </td>
          <td>{new Date(template.timestamp).toLocaleDateString()}</td>
          <td>
            {template.modifiedDate
              ? new Date(template.modifiedDate).toLocaleDateString()
              : new Date(template.timestamp).toLocaleDateString()}
          </td>
          <td
            style={{
              backgroundColor:
                template.status === 'Approved'
                  ? '#3a7027'
                  : template.status === 'Sent'
                  ? '#28a745'
                  : '#e2e622',
              color: 'white',
            }}
          >
            {template.status || 'Draft'}
          </td>
          <td>
            <div className="d-flex gap-3 justify-content-center">
              <Copy
                size="38"
                color="#2b3f87"
                className="btn btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(template.id);
                }}
              />
              {(!template.status || template.status === 'Draft') && (
                <>
                  <UserEdit
                    size="38"
                    color="#2b3f87"
                    className="btn btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(template);
                    }}
                  />
                  <button
                    className="btn btn-sm"
                    style={{ color: '#2b3f87' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmit(template.id);
                    }}
                  >
                    Submit
                  </button>
                </>
              )}
              {template.status === 'Approved' && (
                <button
                  className="btn btn-sm"
                  style={{ color: '#2b3f87' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSend(template.id);
                  }}
                >
                  Send
                </button>
              )}
              <Trash
                size="38"
                color="#2b3f87"
                className="btn btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(template.slug);
                }}
              />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}


      {editingTemplate && 
      (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Template</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingTemplate(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Template Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Updated Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newUpdatedDate}
                    onChange={(e) => setNewUpdatedDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Modified Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newModifiedDate}
                    onChange={(e) => setNewModifiedDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingTemplate(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <br />
    </div>
  );
};

export default Templates;
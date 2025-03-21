import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Copy, UserEdit, Trash } from 'iconsax-react';
import axios from 'axios';

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
        const response = await axios.get('http://localhost:3001/api/whatsappmarketing/templates');
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
        `http://localhost:3001/api/whatsappmarketing/templates/${editingTemplate.id}`,
        updatedTemplate
      );
      const updatedTemplates = templates.map((t) =>
        t.id === editingTemplate.id ? response.data : t
      );
      setTemplates(updatedTemplates);
      setEditingTemplate(null);
    } catch (err) {
      console.error('Error saving edit:', err);
      alert('Failed to save changes');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/whatsappmarketing/templates/${id}`);
      setTemplates(templates.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting template:', err);
      alert('Failed to delete template');
    }
  };

  const handleSubmit = async (id) => {
    try {
      const template = templates.find((t) => t.id === id);
      const response = await axios.put(
        `http://localhost:3001/api/whatsappmarketing/templates/${id}`,
        { ...template, status: 'Approved', modifiedDate: new Date().toISOString() }
      );
      const updatedTemplates = templates.map((t) =>
        t.id === id ? response.data : t
      );
      setTemplates(updatedTemplates);
    } catch (err) {
      console.error('Error submitting template:', err);
      alert('Failed to submit template');
    }
  };

  const handleCreateNewTemplate = () => {
    navigate('/whatsappmarketing/Templates/SelectTemplate');
  };

  return (
   <div style={{backgroundColor:'#FFF8EF',padding:10}}>
     <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Message Templates</h3>
        <button
          className="btn"
          onClick={handleCreateNewTemplate}
          style={{ backgroundColor: '#2b3f87', color: 'white' }}
        >
          Create New Template
        </button>
      </div>

      {editingTemplate && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Template</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditingTemplate(null)}
                >
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="templateName">Template Name</label>
                  <input
                    type="text"
                    id="templateName"
                    className="form-control"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="updatedDate">Updated Date</label>
                  <input
                    type="date"
                    id="updatedDate"
                    className="form-control"
                    value={newUpdatedDate}
                    onChange={(e) => setNewUpdatedDate(e.target.value)}
                  />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="modifiedDate">Modified Date</label>
                  <input
                    type="date"
                    id="modifiedDate"
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
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center">Loading templates...</div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) : templates.length === 0 ? (
        <div className="text-center">No templates found</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th style={{ backgroundColor: '#2b3f87', color: 'white', textAlign: 'center' }}>Template Name</th>
              <th style={{ backgroundColor: '#2b3f87', color: 'white', textAlign: 'center' }}>Updated Date</th>
              <th style={{ backgroundColor: '#2b3f87', color: 'white', textAlign: 'center' }}>Modified Date</th>
              <th style={{ backgroundColor: '#2b3f87', color: 'white', textAlign: 'center' }}>Status</th>
              <th style={{ backgroundColor: '#2b3f87', color: 'white', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {templates.map((template) => (
              <tr key={template.id}  onClick={() => navigate('/whatsappmarketing/BroadCast')}>
                <td>{template.templateName}</td>
                <td>{new Date(template.timestamp).toLocaleDateString()}</td>
                <td>{template.modifiedDate ? new Date(template.modifiedDate).toLocaleDateString() : new Date(template.timestamp).toLocaleDateString()}</td>
                <td
                  style={{
                    backgroundColor: template.status === 'Approved' ? '#3a7027' : '#e2e622',
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
                      onClick={() => handleCopy(template.id)}
                    />
                    {(!template.status || template.status === 'Draft') && (
                      <>
                        <UserEdit
                          size="38"
                          color="#2b3f87"
                          className="btn btn-sm"
                          onClick={() => handleEdit(template)}
                        />
                        <button
                          className="btn btn-sm"
                          style={{ color: '#2b3f87' }}
                          onClick={() => handleSubmit(template.id)}
                        >
                          Submit
                        </button>
                      </>
                    )}
                    <Trash
                      size="38"
                      color="#2b3f87"
                      className="btn btn-sm"
                      onClick={() => handleDelete(template.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
   </div>
  );
};

export default Templates;
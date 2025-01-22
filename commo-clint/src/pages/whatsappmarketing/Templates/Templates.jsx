import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Copy, UserEdit, Trash } from 'iconsax-react';

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([
    { id: 1, name: 'Template 1', updatedDate: '2025-01-01', modifiedDate: '2025-01-01', status: 'Approved' },
    { id: 2, name: 'Template 2', updatedDate: '2025-01-02', modifiedDate: '2025-01-02', status: 'Draft' },
    { id: 3, name: 'Template 3', updatedDate: '2025-01-03', modifiedDate: '2025-01-03', status: 'Approved' },
  ]);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [newName, setNewName] = useState('');
  const [newUpdatedDate, setNewUpdatedDate] = useState('');
  const [newModifiedDate, setNewModifiedDate] = useState('');

  const handleCopy = (id) => {
    const template = templates.find((t) => t.id === id);
    navigator.clipboard.writeText(template.name);
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setNewName(template.name);
    setNewUpdatedDate(template.updatedDate);
    setNewModifiedDate(template.modifiedDate);
  };

  const handleSaveEdit = () => {
    const updatedTemplates = templates.map((template) =>
      template.id === editingTemplate.id
        ? { ...template, name: newName, updatedDate: newUpdatedDate, modifiedDate: newModifiedDate }
        : template
    );
    setTemplates(updatedTemplates);
    setEditingTemplate(null);
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter((t) => t.id !== id));
  };

  const handleSubmit = (id) => {
    const updatedTemplates = templates.map((template) =>
      template.id === id ? { ...template, status: 'Approved' } : template
    );
    setTemplates(updatedTemplates);
  };

  const handleCreateNewTemplate = () => {
    navigate('/whatsappmarketing/Templates/SelectTemplate');
  };

  return (
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

      {/* Editable Template Modal */}
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
                  <span>&times;</span>
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
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.updatedDate}</td>
              <td>{template.modifiedDate}</td>
              <td
                style={{
                  backgroundColor: template.status === 'Approved' ? '#3a7027' : '#e2e622',
                  color: 'white',
                }}
              >
                {template.status}
              </td>
              <td>
                <div className="d-flex gap-3">
                  <Copy
                    size="38"
                    color="#2b3f87"
                    className="btn btn-sm"
                    onClick={() => handleCopy(template.id)}
                  />
                  {template.status === 'Draft' && (
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
    </div>
  );
};

export default Templates;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../../../../components/Footer';

const SavedPreview = () => {
  const navigate = useNavigate();
  const [savedData, setSavedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates`,
          {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
        console.log('Fetched templates:', response.data);
        setSavedData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError('Failed to load templates');
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  const handleViewContacts = async (slug) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${slug}/contacts`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setSelectedContacts(response.data);
    } catch (err) {
      console.error('Error fetching contacts:', err.response?.data || err.message);
      alert(`Failed to load contacts: ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDelete = async (slug) => {
    console.log('Deleting template with slug:', slug);
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${slug}`,
          {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
        );
        const updatedData = savedData.filter((template) => template.slug !== slug);
        setSavedData(updatedData);
        setSelectedContacts(null);
      } catch (err) {
        console.error('Error deleting template:', err.response?.data || err.message);
        alert(`Failed to delete template: ${err.response?.data?.error || err.message}`);
      }
    }
  };

  // const handleSave = () => {
  //   navigate('/whatsappmarketing/Templates');
  // };
  const handleSave = async (template) => {
    try {
      const slug = template.slug;
      await axios.post(`${process.env.REACT_APP_API_URL}/api/whatsappmarketing/templates/${slug}/send`,
        null,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      alert("Messages sent successfully!");
      navigate('/whatsappmarketing/Templates');
    } catch (err) {
      console.error("Error sending messages:", err.response?.data || err.message);
      alert("Failed to send messages");
    }
  };
  
  const getMediaShapeStyle = (shape) => {
    switch (shape) {
      case 'Round': return { borderRadius: '50%' };
      case 'Oval': return { borderRadius: '50% / 25%' };
      case 'Rounded': return { borderRadius: '15px' };
      case 'Semi-border': return { borderRadius: '0 50% 50% 0' };
      case 'Diamond': return { transform: 'rotate(45deg)', borderRadius: '10px' };
      default: return { borderRadius: '0' };
    }
  };

  return (
    <>

      <div style={{ backgroundColor: '#FFF8EF' }}>
        <div className="container mt-4" style={{ marginBottom: 20 }}>
          <button
            className="btn btn-primary mb-4"
            onClick={() => navigate('/whatsappmarketing/Templates/Preview')}
          >
            Back
          </button>
          {loading ? (
            <div className="text-center mt-5">
              <p>Loading templates...</p>
            </div>
          ) : error ? (
            <div className="text-center mt-5">
              <p>{error}</p>
            </div>
          ) : savedData.length === 0 ? (
            <div className="text-center mt-5">
              <p>No saved templates found!</p>
            </div>
          ) : (
            <>
              <h2 className="text-center mb-4" style={{ color: '#4a4a4a' }}>
                Saved Templates
              </h2>
              <div className="d-flex flex-wrap justify-content-center gap-4">
                {savedData.map((template) => (
                  <div
                    key={template.id}
                    className="card shadow-lg"
                    style={{
                      flex: '1 1 350px',
                      maxWidth: '350px',
                      minWidth: '300px',
                      borderRadius: '15px',
                      backgroundColor: '#fefefe',
                      border: 'none',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      className="card-header text-white text-center py-3"
                      style={{
                        backgroundColor: '#4CAF50',
                        borderBottom: '5px solid #388E3C',
                      }}
                    >
                      <h5 style={{ margin: 0, fontWeight: 'bold' }}>
                        {template.templateName}
                      </h5>
                      <span className="badge bg-light text-dark">
                        {template.category}
                      </span>
                    </div>

                    {template.mediaUrl && (
                      <div className="media-container my-3" style={{ textAlign: 'center' }}>
                        {template.mediaType === 'Image' ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL}${template.mediaUrl}`}
                            alt={`${template.templateName} Preview`}
                            className="img-fluid"
                            style={{
                              maxWidth: '90%',
                              maxHeight: '150px',
                              objectFit: 'cover',
                              ...getMediaShapeStyle(template.mediaShape),
                            }}
                            onError={(e) => {
                              console.log('Image failed to load:', template.mediaUrl);
                              e.target.src = 'defaultImage.jpg';
                            }}
                          />
                        ) : (
                          <video
                            src={`${process.env.REACT_APP_API_URL}${template.mediaUrl}`}
                            controls
                            className="img-fluid"
                            style={{
                              maxWidth: '90%',
                              maxHeight: '150px',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                      </div>
                    )}

                    <div className="card-body px-4 py-3">
                      <p><strong>Header:</strong> {template.header || 'N/A'}</p>
                      <p><strong>Body:</strong> {template.body}</p>
                      <p><strong>Footer:</strong> {template.footer || 'N/A'}</p>
                      {template.contactsUrl && (
                        <p>
                          <strong>Contacts:</strong>{' '}
                          <a href={`${process.env.REACT_APP_API_URL}${template.contactsUrl}`} download>
                            Download
                          </a>{' '}
                          |{' '}
                          <button
                            className="btn btn-link p-0"
                            onClick={() => handleViewContacts(template.slug)}
                          >
                            View Contacts
                          </button>
                        </p>
                      )}
                    </div>

                    <div className="card-footer text-center">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(template.slug)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-success"
                        style={{ marginLeft: 10 }}
                        onClick={() => handleSave(template)}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedContacts && (
                <div className="mt-4">
                  <h3>Contacts</h3>
                  <button
                    className="btn btn-secondary mb-2"
                    onClick={() => setSelectedContacts(null)}
                  >
                    Close
                  </button>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        {Object.keys(selectedContacts[0] || {}).map((key) => (
                          <th key={key}>{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {selectedContacts.map((contact, index) => (
                        <tr key={index}>
                          {Object.values(contact).map((value, i) => (
                            <td key={i}>{value}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SavedPreview;
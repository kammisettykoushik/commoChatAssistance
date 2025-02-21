import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { ArrowRight2 } from 'iconsax-react';

const DesignPreviewScreen = () => {
    const navigate = useNavigate();
    
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        // Load saved campaigns from localStorage
        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        setCampaigns(savedCampaigns);
    }, []);

    const handleDelete = (id) => {
        // Remove the campaign with the given ID
        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
        setCampaigns(updatedCampaigns);

        // Update localStorage with the new campaign list
        localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-4 mb-4">
            <div className="d-flex gap-4 align-items-center mb-4">
                <button className="btn " onClick={handleBack}>
                    <ArrowRight2 size="32" color="blue" variant="Bold"/>
                </button>
                <h4 className="fw-bold">Campaign Preview</h4>
            </div>

            {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                    <div key={campaign.id} className="card shadow-lg border mb-4 " style={{ maxWidth: '600px', margin: 'auto' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold mb-3">Preview Email</h5>
                                <button className="btn btn-danger" onClick={() => handleDelete(campaign.id)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                            
                            {/* Campaign Information */}
                            <p><strong>Campaign Name:</strong> {campaign.name || 'No name entered'}</p>
                            <p><strong>From:</strong> {campaign.owners || 'No owners assigned'} | <strong>To:</strong> {campaign.tags || 'No tags added'}</p>
                            
                            {/* Subject */}
                            <h5 style={{ margin: '0' }}>{campaign.subject || 'Email Subject'}</h5>

                            {/* File Preview (if any file exists) */}
                            {campaign.file && (
                                <div className="file-preview" style={{ marginTop: '30px' }}>
                                    <p><strong>Uploaded File:</strong> {campaign.file.name}</p>

                                    {/* Excel preview logic */}
                                    {campaign.excelData && campaign.excelData.length > 0 && (
                                        <div style={{ marginTop: '20px' }}>
                                            {/* Uncomment to display Excel preview */}
                                            {/* <strong>Excel Preview:</strong>
                                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                <thead>
                                                    <tr>
                                                        {Object.keys(campaign.excelData[0]).map((key) => (
                                                            <th key={key} style={{ border: '1px solid #ccc', padding: '5px' }}>
                                                                {key}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {campaign.excelData.slice(0, 3).map((row, index) => (
                                                        <tr key={index}>
                                                            {Object.values(row).map((value, i) => (
                                                                <td key={i} style={{ border: '1px solid #ccc', padding: '5px' }}>
                                                                    {value}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table> */}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Email Body Content */}
                            <div className="email-body" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F8F9FA', borderRadius: '5px' }}>
                                <p>{campaign.content || 'No content available.'}</p>
                            </div>

                            {/* Email Headers */}
                            <div className="email-headers" style={{ marginTop: '20px', fontSize: '12px', color: '#777' }}>
                                <strong>Headers:</strong> {campaign.headers || 'No headers'}
                            </div>

                            {/* Footer */}
                            <div className="email-footer" style={{ marginTop: '30px', padding: '15px', fontSize: '12px', color: '#777', borderTop: '1px solid #ddd' }}>
                                <p><strong>Footer:</strong> {campaign.footer || 'No footer'}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-warning text-center">
                    No campaigns available. Please create a new campaign.
                </div>
            )}
        </div>
    );
};

export default DesignPreviewScreen;

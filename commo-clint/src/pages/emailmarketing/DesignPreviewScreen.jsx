import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { ArrowRight2 } from 'iconsax-react';

const DesignPreviewScreen = () => {
    const navigate = useNavigate();

    const [campaigns, setCampaigns] = useState([]);
    const [file, setFile] = useState(null);
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
        setCampaigns(savedCampaigns);
        console.log(savedCampaigns)
        const savedFile = JSON.parse(localStorage.getItem('uploadedFile'));
        if (savedFile) {
            setFile(savedFile);
        }
    }, []);

    const handleDelete = (id) => {
        const updatedCampaigns = campaigns.filter(campaign => campaign.id !== id);
        setCampaigns(updatedCampaigns);
        localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleOverview = () => {
        navigate('/EmailMarketing/Overview');
    };
    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        localStorage.setItem('uploadedFile', JSON.stringify(uploadedFile));
    };

    return (
        <div className="container mt-4 mb-4" >
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex gap-4 align-items-center">
                    <button className="btn" onClick={handleBack}>
                        <ArrowRight2 size="32" color="blue" variant="Bold" />
                    </button>
                    <h4 className="fw-bold">Campaign Preview</h4>
                </div>
                <button
                    className="fw-bold ml-auto bg-success border p-2 rounded text-white"
                    onClick={handleOverview}
                >
                    See the Overview
                </button>
            </div>


            {/* <input type="file" onChange={handleFileUpload} className="form-control mb-3" /> */}



            <div style={{ display: 'flex' }}>
                {campaigns.length > 0 ? (
                    campaigns.map((campaign) => (
                        <div key={campaign.id} className="card shadow-lg border mb-4 " style={{ maxWidth: '600px', margin: 'auto' }}>
                            <div className="card-body" style={{backgroundColor:'#FFF7C8'}}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="fw-bold mb-3">Preview Email</h5>
                                    <button className="btn btn-danger" onClick={() => handleDelete(campaign.id)}>
                                        <FaTrashAlt />
                                    </button>
                                </div>

                                <p><strong>Campaign Name:</strong> {campaign.name || 'No name entered'}</p>
                                <p><strong>From:</strong> {campaign.owners || 'No owners assigned'} | <strong>To:</strong> {campaign.tags || 'No tags added'}</p>
                                <h5 style={{ margin: '0' }}>{campaign.subject || 'Email Subject'}</h5>

                                {campaign.image && (
                                    <div className="mb-3">
                                        <p>Uploaded Image:</p>
                                        <img src={campaign.image} alt="Uploaded" style={{ maxWidth: '100%' }} />
                                    </div>
                                )}

                                {/* {file && ( */}
                                <div className="file-preview" style={{ marginTop: '30px' }}>
                                    <p><strong>Uploaded File:</strong> {campaign?.files?.fileName || 'no files added'}</p>
                                </div>
                                {/* )} */}
                                <div className="email-body" style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F8F9FA', borderRadius: '5px' }}>
                                    <p>{campaign.content || 'No content available.'}</p>
                                </div>

                                <div className="email-headers" style={{ marginTop: '20px', fontSize: '12px', color: '#777' }}>
                                    <strong>Headers:</strong> {campaign.headers || 'No headers'}
                                </div>

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
        </div>
    );
};

export default DesignPreviewScreen;

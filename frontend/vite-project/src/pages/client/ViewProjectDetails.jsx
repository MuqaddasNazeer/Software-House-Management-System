import ContactForm from '../../components/ContactForm';
import React, { useState } from 'react';



const ViewProjectDetails = ({ project, onClose }) => {
    console.log('Project details : ', project)

    const [contact, setContact] = useState();
    const [showContactModal, setShowContactModal] = useState(false);
    const handleContactAdminClick = () => {
        setContact('a@gmail.com');
        setShowContactModal(true);
    }
    const handleContactDeveloperClick = () => {
        setContact('developer@gmail.com'); //Set it by getting it from api call
        setShowContactModal(true);
    }

    const handleContactClick = () => {
        setShowContactModal(true);
    };

    const handleCloseContactModal = () => {
        setShowContactModal(false);
    };
    return (
        <div className="bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Project Details</h2>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Project Name:</span> {project.title}
                </p>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Deadline:</span> {project.deadlineDate}
                </p>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Status:</span> {project.status || 'N/A'}
                </p>
            </div>
            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Repository Link:</span>
                    <a href={
                        project.repositoryLink && !project.repositoryLink.startsWith('http')
                            ? `http://${project.repositoryLink}`
                            : project.repositoryLink || '#'
                    } target='_blank'>{project.repositoryLink || 'N/A'}</a>
                </p>
            </div>

            <div className="flex justify-end">

                <button
                    onClick={project.status === 'Pending' ? handleContactAdminClick : handleContactDeveloperClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    {project.status === 'Pending' ? 'Contact Admin' : 'Contact Developer'}
                </button>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Close
                </button>
            </div>

            {showContactModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        {/* Modal content */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            {/* Content of the Contact Team Modal */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                            >
                                <ContactForm onClose={handleCloseContactModal} contactEmail={contact} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProjectDetails;

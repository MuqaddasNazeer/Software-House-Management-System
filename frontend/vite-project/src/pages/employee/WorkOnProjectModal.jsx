import axios from "axios";
import React, { useState } from "react";

const WorkOnProjectModal = ({ project, onClose }) => {
    // Functions
    const handleSendLink = async (e) => {
        e.preventDefault();
        console.log(project._id, repoLink)
        try {
            const response = await axios.post(`http://localhost:5555/api/assignRepository/${project._id}`, { repoLink });
            console.log(response.data); 
            alert('Repository Assigned :', response.message) // Log the response from the backend
            // You can handle the response as needed
            setRepoLink('')
        } catch (error) {
            console.error('Error sending link:', error);
            alert(`Error sending link: ${error.message}`);
        }
    };

    const handleCompleteProjectClick = async (project_Id) => {
        try {
            const response = await axios.put(`http://localhost:5555/api/completeProject/${project_Id}`);
            console.log(response.message);  // Log the response from the backend
            // You can handle the response as needed
            alert('Project Completed :', response.data.message)
            onClose()
        } catch (error) {
            console.error('Error sending link:', error);
            alert(`Error sending link: ${error.message}`);
        }

    }

    // Console logs for checking
    console.log('Project details : ', project)

    //States for the form
    const [repoLink, setRepoLink] = useState('');

    //Return statement
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
                    <p className="text-gray-600">
                        <span className="font-semibold">Documents:</span>
                        <a
                            // href={`http://localhost:5555/api/downloadDocument/${project.documents}`}  // Replace with the actual download endpoint
                            // target="_blank"  // Open the link in a new tab/window
                            // rel="noopener noreferrer"
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Click to Download
                        </a>
                    </p>
                </p>
            </div>
            <form onSubmit={handleSendLink}>
                <div className="mb-4">
                    <p className="text-gray-600">
                        <span className="font-semibold">Repository Link:</span>
                    </p>
                    <input
                        type="text"
                        id="repositoryLink"
                        name="repositoryLink"
                        placeholder="Paste repository link here (Github, Gitlab)"
                        value={repoLink}
                        onChange={(e) => setRepoLink(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Assign
                    </button>
                </div>
            </form>

            <div className="flex justify-end">

                <button
                    onClick={() => handleCompleteProjectClick(project._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                >
                    Complete Project
                </button>
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Close
                </button>
            </div>

        </div>
    );

}

export default WorkOnProjectModal;
import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';

const ClientProjectProposal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [documents, setDocuments] = useState(null);

    const onDrop = (acceptedFiles) => {
        // Handle the dropped files (in this case, just storing the first file)
        setDocuments(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.zip', // Allow only .zip files
        multiple: false, // Allow only a single file
    });

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('deadlineDate', deadline);
            formData.append('file', documents);
            formData.append('clientEmail', localStorage.getItem('userEmail'));
            const response = await axios.post('http://localhost:5555/api/uploadProject', formData);
            console.log(response.data);
            alert(response.data.message);
        }
        catch (error) {
            // Handle different types of errors
            if (error.response) {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Server responded with an error:', error.response.data);
                alert(`Server error: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received from server:', error.request);
                alert('No response received from the server');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
                alert(`Error setting up the request: ${error.message}`);
            }
        }
        onClose();
    };

    return (
        <div className="mx-auto mt-6 p-6 bg-white shadow-md rounded-md max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Project Proposal</h2>
            <form onSubmit={handleFormSubmit}>

                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="mt-1 p-2 w-full border rounded-md"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-600">
                        Deadline
                    </label>
                    <DatePicker
                        id="deadlineDate"
                        name='deadlineDate'
                        selected={deadline}
                        onChange={(date) => setDeadline(date)}
                        dateFormat="yyyy-MM-dd"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="documents" className="block text-sm font-medium text-gray-600">
                        Documents (ZIP file)
                        <span className="block text-gray-400 text-sm mt-1">(Once uploaded cannot be changed)</span>
                    </label>
                    <div {...getRootProps()} className="mt-1 p-2 w-full border rounded-md cursor-pointer bg-gray-100">
                        <input {...getInputProps()} type='file'/>
                        {documents ? (
                            <p>{documents.name}</p>
                        ) : (
                            <p>Upload .zip file here, or click to select one</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    >
                        Post Project
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ClientProjectProposal;

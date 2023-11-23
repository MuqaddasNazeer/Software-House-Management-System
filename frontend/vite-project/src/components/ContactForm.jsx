import React, { useState } from 'react';
import axios from 'axios';

import { useLocation } from 'react-router-dom'


const ContactForm = ({ onClose, contactEmail, path }) => {
    const [formData, setFormData] = useState({
        subject: '',
        email: contactEmail,
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await axios.post('http://localhost:5555/api/send-email', formData);
            console.log(response);
            alert(response.data.message);
            setFormData({
                subject: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error('Error sending mail :', error);

            // Handle different types of errors
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
                alert(`Server error: ${error.response.data.message}`);
            } else if (error.request) {
                console.error('No response received from server:', error.request);
                alert('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
                alert(`Error setting up the request: ${error.message}`);
            }
        }
    };


    const location = useLocation();
    console.log(location.pathname)
    console.log(path)

    return (
        <div className={location.pathname === path ? `w-full mt-6 p-6 bg-white shadow-md rounded-md ml-64` : `bg-white rounded-md p-6 w-full h-fit`}>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-600">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    ></textarea>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
            {location.pathname === path ?
                null
                : <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Close
                </button>
            }
        </div>
    );
};

export default ContactForm;

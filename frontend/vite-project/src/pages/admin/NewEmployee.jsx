import React, { useState } from 'react';
import axios from 'axios';

const NewEmployee = ({ onClose }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
        role: 'employee', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Value on change : ', value);

        setFormData({ ...formData, [name]: value });
        console.log('Form data after change : ', formData);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Form data : ', formData);
            axios.post('http://localhost:5555/api/register', formData).then((response) => {
                console.log(response);
                alert('Employee created successfully');

            }).catch((error) => {
                console.log(error);
                alert('Error creating new employee');

            });
        }
        catch (error) {
            console.error('Error while making employee:', error);

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
    };

    return (
        <div className="bg-white rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">New Employee</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
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
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 p-2 w-full border rounded-md"
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Add Employee
                </button>
            </form>

            <div className="flex justify-end mt-4">
                <button
                    onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Close
                </button>
            </div>
        </div>

    );
};

export default NewEmployee;


// <div className="fixed inset-0 z-10 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div className="fixed inset-0 transition-opacity">
//                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//                 </div>

//                 {/* Modal content */}
//                 <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
//                 <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
//                     <div className="max-w-md mx-auto mt-8 p-6">
//                         <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
//                         <form onSubmit={handleSubmit}>
//                             {/* Your form fields */}
//                             <div className="mb-4">
//                                 <label htmlFor="username" className="block text-sm font-medium text-gray-600">
//                                     Username
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="username"
//                                     name="username"
//                                     value={formData.username}
//                                     onChange={handleChange}
//                                     className="mt-1 p-2 w-full border rounded-md"
//                                     required
//                                 />
//                             </div>

//                             {/* Repeat similar structure for other form fields */}

//                             <button
//                                 type="submit"
//                                 className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
//                             >
//                                 Add Employee
//                             </button>
//                         </form>
//                         <button
//                             onClick={onClose}
//                             className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mt-4"
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>


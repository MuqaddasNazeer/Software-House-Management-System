// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
        role: 'client', // Default role
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log('Value on change : ', value);

        setFormData({ ...formData, [name]: value });
        console.log('Form data after change : ', formData);
    };
    const handleRoleChange = (e) => {
        const { value } = e.target;
        console.log('Value on change : ', value);
        setFormData({ ...formData, role: value });
        console.log('Form data after change : ', formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Form data : ', formData);
            axios.post('http://localhost:5555/api/register', formData).then((response) => {
                console.log(response);
                alert('User created successfully');
                navigate('/login')
            }).catch((error) => {
                console.log(error);
                alert('Error creating user');
                navigate('/register')
            });
        }
        catch (error) {
            console.error('Error while login user:', error);

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
        <div className="flex items-center justify-center h-screen w-screen">
            <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
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
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
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
                        <label htmlFor="location" className="block text-sm font-medium text-gray-600">
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
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Role</label>
                        <div className="flex">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    checked={formData.role === 'admin'}
                                    onChange={handleChange}
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2">Admin</span>
                            </label>
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    name="role"
                                    value="employee"
                                    checked={formData.role === 'employee'}
                                    onChange={handleChange}
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2">Employee</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="role"
                                    value="client"
                                    checked={formData.role === 'client'}
                                    onChange={handleChange}
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2">Client</span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500">Login to account</Link>.
                </p>
            </div>
        </div>
    );
};

export default SignUp;

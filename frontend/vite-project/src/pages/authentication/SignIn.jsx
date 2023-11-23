// Signup.js
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5555/api/login', formData);
            console.log(response);

            alert(response.data.message);

            if (response.data.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (response.data.role === 'client') {
                navigate('/client/dashboard');
            } else if (response.data.role === 'employee') {
                navigate('/employee/dashboard');
            } else {
                // Handle invalid credentials
                alert('Invalid credentials');
            }

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userEmail', response.data.email);
        } catch (error) {
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
            <div className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-md">
                <h2 className="text-3xl font-semibold mb-4">Sign In</h2>
                <form onSubmit={handleSubmit}>
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
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-sm text-gray-600">
                    Don't have an account? <Link to="/register" className="text-blue-500">Create an account</Link>.
                </p>
            </div>
        </div>

    );
};

export default SignIn;

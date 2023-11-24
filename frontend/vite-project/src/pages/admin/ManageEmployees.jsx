import React, { useEffect, useState } from 'react';
import NewEmployee from './NewEmployee';
import axios from 'axios';
import ViewEmployeeDetails from './ViewEmployeeDetails';


const ManageEmployees = () => {
   
    const [employees, setEmployees] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
    const [showViewEmployeeModal, setShowViewEmployeeModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const handleDeleteEmployeeClick = (employee_Id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this employee?');

        if (isConfirmed) {
            console.log(employee_Id);
            axios
                .delete(`http://localhost:5555/api/deleteEmployee/${employee_Id}`)
                .then((response) => {
                    console.log(response.data.message);
                    alert(response.data.message);
                })
                .catch((error) => {
                    console.log(error);
                    alert('Error deleting employee');
                });
        }
    };

    const handleAddEmployeeClick = () => {
        setShowAddEmployeeModal(true);
    };

    const handleCloseAddEmployeeModal = () => {
        setShowAddEmployeeModal(false);

    }
    const handleCloseViewEmployeeModal = () => {
        setShowViewEmployeeModal(false);
    }
    const handleViewEmployeeClick = (employee_Id) => {
        console.log(employee_Id);
        axios
            .get(`http://localhost:5555/api/employeeDetails/${employee_Id}`)
            .then((response) => {
                console.log(response.data);
                setSelectedEmployee(response.data)
                setShowViewEmployeeModal(true);
                // setEmployees(response.data.data);

            })
            .catch((error) => {
                console.log(error);
                alert('Error viewing employee details');
            });
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5555/api/getEmployees`)
            .then((response) => {
                console.log(response.data.data);
                setEmployees(response.data.data);
                // setClientProjects(response.data.projects);
                // console.log(clientProjects);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);




    return (
        <div className="w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">
            <div >
                <h2 className="text-2xl font-bold mb-4 text-center">Employees</h2>

                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="p-2 border rounded-md"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                    </div>
                    <div>
                        <button onClick={handleAddEmployeeClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Add Employee
                        </button>
                    </div>
                </div>

                {/* This page content */}
                {employees.length > 0 ? (
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left rtl:text-right bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees
                                    .filter((employee) =>
                                        searchData.toLowerCase() === ''
                                            ? employee
                                            : employee.username.toLowerCase().includes(searchData.toLowerCase())
                                    )
                                    .map((employee, index) => (
                                        <tr
                                            key={employee._id} // Add a unique key for each row
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {employee.username}
                                            </th>
                                            <td className="px-6 py-4">{employee.email}</td>
                                            <td className="px-6 py-4">{employee.location}</td>
                                            <td className="px-6 py-4">
                                                <button onClick={() => handleViewEmployeeClick(employee._id)} className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                                                    View Details
                                                </button>
                                                <button onClick={() => handleDeleteEmployeeClick(employee._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>) : (
                    <div className="text-center">
                        <p className="text-xl font-semibold mb-4">
                            No Employees added yet.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Click the button below to <span className='text-blue-500 text-lg'>add a new Employee.</span>
                        </p>
                    </div>
                )}



                {/* Add new Employee Modal*/}
                {showAddEmployeeModal && (
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
                                <NewEmployee onClose={handleCloseAddEmployeeModal} />
                            </div>
                        </div>
                    </div>
                )}

                {/* View Employee Details */}
                {showViewEmployeeModal && (
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
                                <ViewEmployeeDetails employeeDetails={selectedEmployee} onClose={handleCloseViewEmployeeModal} />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ManageEmployees;

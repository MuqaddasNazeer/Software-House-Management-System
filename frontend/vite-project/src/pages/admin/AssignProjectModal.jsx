import axios from "axios";
import React, { useEffect, useState } from "react";

const AssignProjectModal = ({ project, onClose }) => {
    // Functions
    const handleAssignClick = async (employeeId) => {
        console.log(`Project ${project._id} assigned to a team`);
        try {
            const url = `http://localhost:5555/api/assignProject/${project._id}/${employeeId}`;
            const response = await axios.post(url);
            console.log(response.data);
            alert(response.data.message);
            onClose();
        } catch (error) {
            console.error('Error assigning project:', error);
            alert(`Error assigning project: ${error.message}`);
        }
    };

    // States for the form
    const [searchData, setSearchData] = useState('');
    const [employees, setEmployees] = useState([]);

    // Use Effect for fetching employees
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = 'http://localhost:5555/api/getEmployees';
                const response = await axios.get(url);
                console.log(response.data.data);
                setEmployees(response.data.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchData(); // Call the fetchData function

    }, []); // Provide an empty dependency array

    // Return statement
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
                    <span className="font-semibold">Client Name:</span> {project.postedBy?.username || 'N/A'}
                </p>
            </div>

            {employees.length === 0 ? (
                <p className="text-gray-600 text-center">No employees available</p>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Employees Available</h2>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="p-2 border rounded-md"
                            value={searchData}
                            onChange={(e) => setSearchData(e.target.value)}
                        />
                    </div>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full ">
                        <table className="w-full text-sm text-left rtl:text-right bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-4 py-3">
                                        Location
                                    </th>
                                    <th scope="col" className="px-4 py-3">
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
                                    .map((employee) => (
                                        <tr
                                            key={employee._id} // Add a unique key for each row
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {employee.username}
                                            </th>
                                            <td className="px-4 py-4">{employee.email}</td>
                                            <td className="px-4 py-4">{employee.location}</td>
                                            <td className="px-4 py-4 text-right">
                                                <button
                                                    onClick={() => handleAssignClick(employee._id)}
                                                    className="font-medium text-blue-600 hover:text-blue-500 mr-2"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <div className="flex justify-end">
                <button
                    onClick={onClose}
                    className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AssignProjectModal;

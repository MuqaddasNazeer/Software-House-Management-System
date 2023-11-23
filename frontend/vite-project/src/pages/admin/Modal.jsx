
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// {
//     "_id": "project_id_10",
//     "projectName": "Machine Learning Project",
//     "clientName": "Client J",
//     "postedAt": "2023-10-18T15:30:00Z",
//     "deadline": "2024-01-10T08:00:00Z",
//     "documents": "document_id_10",
//     "status": "completed"
// };

const Modal = ({ project, onClose }) => {
    const [searchData, setSearchData] = useState('');
    // Sample employee data

    const [employees, setEmployees] = useState([]);
    useEffect(async () => {
        console.log('USe effect hit')
        try {
            const url = 'http://localhost:5555/api/getEmployees';
            const response = await axios.get(url);
            console.log(response.data.data)
            setEmployees(response.data.data);
        }
        catch (error) {
            console.log(error)
        }
    }, []);
    const handleAssignClick = async (projectId, employeeId) => {
        console.log(`Project ${projectId} assigned to a team`);
        try {
            const url = `http://localhost:5555/api/assignProject/${projectId}/${employeeId}`;
            const response = await axios.post(url);
            console.log(response.data.message)
            alert(response.data.message)
            onClose();

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white rounded-md p-6 w-fit">
            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Project Name:</span> {project.title}
                </p>
            </div>
            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Client Name:</span> {project.postedBy.username}
                </p>
            </div>

            <div className="mb-4">
                <p className="text-gray-600">
                    <span className="font-semibold">Deadline:</span> {project.deadlineDate}
                </p>
            </div>
            <h2 className="text-2xl font-bold mb-4">Employees Available</h2>
            <div className='mb-3'>
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
                                            onClick={() => handleAssignClick(project._id, employee._id)}
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



            <div className="flex justify-end mt-4">

                <button
                    type="button"
                    onClick={
                        onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;

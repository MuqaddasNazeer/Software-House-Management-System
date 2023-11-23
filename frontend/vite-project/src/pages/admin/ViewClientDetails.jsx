
import React, { useEffect, useState } from 'react';

const ViewClientDetails = ({ clientDetails, onClose }) => {


    const [projects, setProjects] = useState([]); // This will be the list of projects from the api [projectData


    const [searchData, setSearchData] = useState('');
    useEffect(() => {
        setProjects(clientDetails.projectsData)
    });
    const handleDownloadClick = (project) => {
        // Write code to download the project
    };
    if (!clientDetails) {
        return <>
            <div className="bg-white rounded-md p-6"><p className='text-center'>No data to show.</p>
                <div className="flex justify-end mt-4">

                    <button
                        onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    >
                        Close
                    </button>

                </div>
            </div>
        </>
    }
    else {

        return (

            <div className="bg-white rounded-md p-6">
                <h2 className="text-2xl font-bold mb-4">Client Details</h2>

                <div className="flex mb-4 justify-between">
                    <div className="mr-4">
                        <p className="text-gray-600">
                            <span className="font-semibold">Client Name:</span> {clientDetails.clientData?.username}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">
                            <span className="font-semibold">Email:</span> {clientDetails.clientData?.email}
                        </p>
                    </div>
                </div>

                {projects.length == 0 ? (

                    <div className="text-center">
                        No projects posted by the client.
                    </div>
                ) : (
                    <>
                        <div className='mb-3'>
                            <input
                                type="text"
                                placeholder="Search by name..."
                                className="p-2 border rounded-md"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                            <table className="w-full text-sm text-left rtl:text-right bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Project Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Deadline
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr >
                                </thead >
                                <tbody>
                                    {projects
                                        .filter((project) =>
                                            searchData.toLowerCase() === ''
                                                ? project
                                                : project.title.toLowerCase().includes(searchData.toLowerCase())
                                        )
                                        .map((project) => (
                                            <tr
                                                key={project._id} // Add a unique key for each row
                                                className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                            >

                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {project.title}
                                                </th>
                                                <td className="px-6 py-4">{project.deadlineDate}</td>
                                                <td className="px-6 py-4">{project.status}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDownloadClick(singleProject)}
                                                        className="font-medium text-blue-600 hover:underline"
                                                    >
                                                        Download
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table >
                        </div >
                    </>
                )}


                <div className="flex justify-end mt-4">

                    <button
                        onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                    >
                        Close
                    </button>

                </div>

            </div >

        );
    }
};

export default ViewClientDetails;

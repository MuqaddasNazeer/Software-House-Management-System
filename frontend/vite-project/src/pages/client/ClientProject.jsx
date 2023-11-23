import React, { useEffect, useState } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import ClientProjectProposal from './ClientProjectProposal';
import ViewProjectDetails from './ViewProjectDetails';
import axios from 'axios';

const ClientProjectPage = () => {
   

    const [clientProjects, setClientProjects] = useState([]); // This will be the projects from the api [clientProjects
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [showViewProjectModal, setShowViewProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null); // This will be the selected project from the table [projectData

    const handleAddProjectClick = () => {
        setShowAddProjectModal(true);
    };
    const handleViewProjectClick = (project_Id) => {
        console.log(project_Id);
        axios
            .get(`http://localhost:5555/api/projectsDetails/${project_Id}`)
            .then((response) => {
                console.log(response.data.project);
                setSelectedProject(response.data.project);

                setShowViewProjectModal(true);

            })
            .catch((error) => {
                console.log(error);
                // Show Alert
            });

        // Set the selected project by api

    };

    const handleCloseAddProjectModal = () => {
        setShowAddProjectModal(false);
    };
    const handleCloseViewProjectModal = () => {
        setShowViewProjectModal(false);
    };
    const [searchData, setSearchData] = useState('');
  
    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            axios
                .get(`http://localhost:5555/api/projectsByClient/${userEmail}`)
                .then((response) => {
                    console.log(response.data.data);
                    setClientProjects(response.data.data);
                    console.log(clientProjects);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            console.log('No user email found');
        }
    }, [showAddProjectModal]);
    return (
        <div className="w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">
            <div className="">
                <h2 className="text-2xl font-bold mb-4 text-center">Projects</h2>

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
                        <button onClick={handleAddProjectClick} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Add Project
                        </button>
                    </div>
                </div>
                {clientProjects.length == 0 ? (
                    <div className="text-center">
                        <p className="text-xl font-semibold mb-4">
                            No projects posted by the client.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Click the button below to <span className='text-blue-500 text-lg'>add a new project.</span>
                        </p>
                    </div>) :
                    (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left rtl:text-right bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No
                                    </th>
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
                                </tr>
                            </thead>
                            <tbody>
                                {clientProjects
                                    .filter((project) =>
                                        searchData.toLowerCase() === ''
                                            ? project
                                            : project.title.toLowerCase().includes(searchData.toLowerCase())
                                    )
                                    .map((project, index) => (
                                        <tr
                                            key={project.id} // Add a unique key for each row
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {project.title}
                                            </th>
                                            <td className="px-6 py-4">{project.deadlineDate}</td>
                                            <td className="px-6 py-4">{project.status || ' '}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => handleViewProjectClick(project._id)} className="font-medium text-blue-600 hover:underline">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}

                {/*Add Project Model */}
                {showAddProjectModal && (
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
                                <ClientProjectProposal onClose={handleCloseAddProjectModal} />
                            </div>
                        </div>
                    </div>
                )}

                {/* View Project Details Modal */}
                {showViewProjectModal && (
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
                                <ViewProjectDetails project={selectedProject} onClose={handleCloseViewProjectModal} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientProjectPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { UsersIcon, CheckCircleIcon } from '@heroicons/react/solid';
import ViewProjectDetails from '../client/ViewProjectDetails';
import WorkOnProjectModal from './WorkOnProjectModal';
import ContactForm from '../../components/ContactForm';

const EmployeeProject = () => {
    const [projects, setProjects] = useState([]);
    const [projectsData, setProjectsData] = useState([]);

    const [selectedProject, setSelectedProject] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [filterType, setFilterType] = useState('assigned'); // 'assigned', 'unassigned'

    // Modals related statess
    const [showWorkModal, setShowWorkModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [contact, setContact] = useState('');
    // Work on project modal
    const handleWorkOnProject = (projectId) => {
        const project = projects.find((p) => p._id === projectId);
        console.log('Project : ',projects.find((p) => p._id === projectId))
        setSelectedProject(project);
        console.log('Selected Project : ',selectedProject)
        setShowWorkModal(true);
    };
    const handleCloseWorkOnProjectModal = () => {
        setShowWorkModal(false);
    };
    // Contact client modal
    const handleContactClick = (email) => {
        setContact(email);
        setShowContactModal(true);
    }
    const handleCloseContactModal = () => {
        setShowContactModal(false);
    }

    useEffect(() => {
        console.log('USe effect hit')
        const fetchProjects = async () => {
            try {
                let url = 'http://localhost:5555/api/projects';

                // Modify the URL based on the selected filterType and add a timestamp
                if (filterType === 'assigned') {
                    url += '?status=In-progress';
                } else if (filterType === 'completed') {
                    url += '?status=completed';
                }

                url += url.includes('?') ? '&' : '?'; // Add '&' if '?' is already present
                url += `timestamp=${new Date().getTime()}`;

                console.log('URL:', url);

                const response = await axios.get(url);
                console.log('Projects:', response.data.projects);
                setProjects(response.data.projects);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        const fetchAllProjects = async () => {
            try {
                const url = 'http://localhost:5555/api/projectsData';
                const response = await axios.get(url);
                console.log('Projects:', response.data.projects);
                setProjectsData(response.data.projects);
            } catch (error) {
                console.error('Error fetching all projects:', error);
            }

        };

        fetchProjects();
        fetchAllProjects()
    }, [filterType, showWorkModal]);  // Include filterType in the dependency array

    const handleViewProject = (repositoryLink) => {
        if (repositoryLink) {
            window.open(repositoryLink, '_blank'); // '_blank' opens the link in a new tab
        } else {
            // Handle the case where repositoryLink is not available
            console.error('Repository link not available');
            // You can show an alert or perform other actions as needed
        }
    };

    // Function to get cards number
    const assignedProjectsCount = projectsData.filter((project) => project.status === 'In-progress').length;
    const completedProjectsCount = projectsData.filter((project) => project.status === 'completed').length;


    return (
        <div className="w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Projects</h2>
            {/* Cards displaying project counts */}
            <div className="flex justify-evenly mb-4">
                <div className="p-4 bg-blue-200 rounded-md flex items-center cursor-pointer" onClick={() => setFilterType('assigned')}>
                    <UsersIcon className="h-8 w-8 mr-2" />
                    <div>
                        <h3 className="text-xl font-bold">Assigned Projects</h3>
                        <p className="text-2xl font-bold">{assignedProjectsCount}</p>
                    </div>
                </div>

                <div className="p-4 bg-green-200 rounded-md flex items-center cursor-pointer" onClick={() => setFilterType('completed')}>
                    <CheckCircleIcon className="h-8 w-8 mr-2" />
                    <div>
                        <h3 className="text-xl font-bold">Completed Projects</h3>
                        <p className="text-2xl font-bold">{completedProjectsCount}</p>
                    </div>
                </div>
            </div>

            {projects.length === 0 ? (
                <p className='text-center'>No projects found for the selected filter.</p>
            ) : (
                <>
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
                            <label className="mr-2">Filter:</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="assigned">Assigned Projects (In Progress)</option>
                                <option value="completed">Assigned Projects (Completed)</option>
                            </select>
                        </div>
                    </div>
                    {/* In-progress Projects */}
                    {filterType === 'assigned' && (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Project Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Deadline
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects
                                    .filter((project) =>
                                        searchData.toLowerCase() === '' ||
                                        project.title.toLowerCase().includes(searchData.toLowerCase())
                                    )
                                    .map((project) => (
                                        <tr
                                            key={project._id}
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <td className="px-6 py-4">{project.title}</td>
                                            <td className="px-6 py-4">{project.status}</td>
                                            <td className="px-6 py-4">{project.deadlineDate}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleWorkOnProject(project._id)}
                                                    className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                >
                                                    Work on Project
                                                </button>
                                                <button
                                                    onClick={() => handleContactClick(project.postedBy.email)}
                                                    className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                                >
                                                    Contact Client
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}
                    {/* Completed Projects */}
                    {filterType === 'completed' && (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Project Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Client Name
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
                                {projects
                                    .filter((project) =>
                                        searchData.toLowerCase() === '' ||
                                        project.title.toLowerCase().includes(searchData.toLowerCase())
                                    )
                                    .map((project) => (
                                        <tr
                                            key={project._id}
                                            className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                        >
                                            <td className="px-6 py-4">{project.title}</td>
                                            <td className="px-6 py-4">{project.postedBy?.username || 'N/A'}</td>
                                            <td className="px-6 py-4">{project.status}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleViewProject(project.repositoryLink)}
                                                    className="mr-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                >
                                                    View Project
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>)}

                </>
            )}

            {/* Modals */}
            {/* Work on Project Modal */}
            {showWorkModal && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                        >
                            <WorkOnProjectModal project={selectedProject} onClose={() => handleCloseWorkOnProjectModal()} />
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Client Modal */}
            {showContactModal && (
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
                            {/* Content of the Contact Team Modal */}
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
                            <div
                                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog" aria-modal="true" aria-labelledby="modal-headline"
                            >
                                <ContactForm onClose={handleCloseContactModal} contactEmail={contact} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeProject;

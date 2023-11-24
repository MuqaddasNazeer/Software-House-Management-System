import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { DocumentTextIcon, UsersIcon, CheckCircleIcon, UserIcon } from '@heroicons/react/solid';
import AssignProjectModal from './AssignProjectModal';
import ContactForm from '../../components/ContactForm';


const ManageProjects = () => {
    // States
    const [projects, setProjects] = useState([]);
    const [projectsData, setProjectsData] = useState([]);

    const [selectedProject, setSelectedProject] = useState(null);
    const [searchData, setSearchData] = useState('');
    const [filterType, setFilterType] = useState('Pending');// 'completed', 'assigned', 'unassigned'

    const [contact, setContact] = useState();
    const [showContactModal, setShowContactModal] = useState(false);

    //Modal States
    const [showApproveProjectModal, setShowApproveProjectModal] = useState(false);

    // Effects fetches projects based on the filterType
    useEffect(() => {
        console.log('USe effect hit')
        const fetchAllProjects = async () => {
            try {
                const url = 'http://localhost:5555/api/projectsData';
                const response = await axios.get(url);
                console.log('Projects All:', response.data.projects);
                setProjectsData(response.data.projects);
                console.log('Filter Type:', filterType);
                // Apply filtering based on filterType
                const filteredProjects = filterProjects(response.data.projects, filterType);

                setProjects(filteredProjects);
                console.log('Filtered Projects:', filteredProjects);
            } catch (error) {
                console.error('Error fetching all projects:', error);
            }
        };

        fetchAllProjects()
    }, [filterType]);  // Include filterType in the dependency array

    const filterProjects = (projects, filterType) => {
        if (filterType === 'In-progress') {
            return projects.filter(project => project.status === 'In-progress');
        } else if (filterType === 'Pending') {
            return projects.filter(project => project.status === 'Pending');
        } else if (filterType === 'completed') {
            return projects.filter(project => project.status === 'completed');
        }

        // If no filtering is needed or the filterType is not recognized, return the original projects
        return projects;
    };
    const handleViewProject = (repositoryLink) => {
        if (repositoryLink) {
            window.open(repositoryLink, '_blank'); // '_blank' opens the link in a new tab
        } else {
            // Handle the case where repositoryLink is not available
            console.error('Repository link not available');
            // You can show an alert or perform other actions as needed
        }
    };
    // Modal Functions

    // Approve Project and assign to employee
    const handleApproveProject = (projectId) => {
        const project = projects.find((p) => p._id === projectId);
        console.log('Project : ', projects.find((p) => p._id === projectId))
        setSelectedProject(project);
        console.log('Selected Project : ', selectedProject)
        setShowApproveProjectModal(true);
    };
    const handleCloseApproveProjectModal = () => {
        setShowApproveProjectModal(false);
    };
    // Contact Modal

    const handleContactEmployeeClick = (email) => {
        setContact(email);
        setShowContactModal(true);
    }
    const handleCloseContactModal = () => {
        setShowContactModal(false);
    }

    // Counting the number of projects in deffernet filters
    const assignedProjectsCount = projectsData.filter((project) => project.status === 'In-progress').length;
    const unassignedProjectsCount = projectsData.filter((project) => project.status === 'Pending').length;
    const completedProjectsCount = projectsData.filter((project) => project.status === 'completed').length;


    return (
        <div className="w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">
            <h2 className="text-2xl font-bold mb-4 text-center">Manage Projects</h2>
            {/* Cards displaying project counts */}
            <div className="flex justify-around mb-4">
                <div className="p-4 bg-blue-200 rounded-md flex items-center cursor-pointer" onClick={() => setFilterType('In-progress')}>
                    <UsersIcon className="h-8 w-8 mr-2" />
                    <div>
                        <h3 className="text-xl font-bold">Assigned Projects</h3>
                        <p className="text-2xl font-bold">{assignedProjectsCount}</p>
                    </div>
                </div>
                <div className="p-4 bg-yellow-200 rounded-md flex items-center cursor-pointer" onClick={() => setFilterType('Pending')}>
                    <DocumentTextIcon className="h-8 w-8 mr-2" />
                    <div>
                        <h3 className="text-xl font-bold">Unassigned Projects</h3>
                        <p className="text-2xl font-bold">{unassignedProjectsCount}</p>
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
            {/* Search and filter */}

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
                                <option value="Pending">Unassigned Projects</option>
                                <option value="In-progress">Assigned Projects (In Progress)</option>
                                <option value="completed">Assigned Projects (Completed)</option>
                            </select>
                        </div>
                    </div>

                    {/* Pending Projects */}
                    {filterType === 'Pending' && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
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
                                            Posted At
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
                                                <td className="px-6 py-4">{project.postedBy.username}</td>
                                                <td className="px-6 py-4">{project.postedAt}</td>
                                                <td className="px-6 py-4">{project.deadlineDate}</td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleApproveProject(project._id)}
                                                        className="mr-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        // onClick={() => handleAssignProject(project._id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                    >
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* In-Progress Projects */}
                    {filterType === 'In-progress' && (<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Project Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Employee Name
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
                                            <td className="px-6 py-4">{project.assignedTo?.username || 'N/A'}</td>
                                            <td className="px-6 py-4">{project.status}</td>
                                            <td className="px-6 py-4">{project.deadlineDate}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleContactEmployeeClick(project.assignedTo?.email || 'N/A')}
                                                    className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                                >
                                                    Contact Employee
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
                                        Employee Name
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
                                            <td className="px-6 py-4">{project.assignedTo?.username || 'N/A'}</td>
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
            {/* Approve/ assign project */}
            {showApproveProjectModal && (
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
                            <AssignProjectModal project={selectedProject} onClose={() => handleCloseApproveProjectModal()} />
                        </div>
                    </div>
                </div>
            )}
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
            {/* Contact Employeer */}

        </div>
    );
};

export default ManageProjects;

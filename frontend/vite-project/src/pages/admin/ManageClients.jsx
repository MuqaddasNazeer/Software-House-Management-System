import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewClientDetails from './ViewClientDetails';



const ManageClients = () => {

    const [clients, setClients] = useState([]); // This will be the list of projects from the api [projectData
    const [showViewClientModal, setShowViewClientModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null); // This will be the selected project from the table [projectData

    const handleViewDetailsClick = (clientId) => {

        console.log(clientId);

        axios
            .get(`http://localhost:5555/api/clientDetails/${clientId}`)
            .then((response) => {
                console.log(response.data);
                setSelectedClient(response.data); 
                setShowViewClientModal(true);

            })
            .catch((error) => {
                console.log(error);
                alert('Error while getting client details')
            });


    };


    const handleCloseViewClientModal = () => {
        setShowViewClientModal(false);
    };
    useEffect(() => {
        axios
            .get(`http://localhost:5555/api/getClients`)
            .then((response) => {
                console.log(response.data);
                setClients(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const [searchData, setSearchData] = useState('');


    return (
        <div className="w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md ml-64">
            <div className="">
                <h2 className="text-2xl font-bold mb-4 text-center">Clients</h2>

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
                </div>

                {/* This page content */}
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
                            {clients
                                .filter((client) =>
                                    searchData.toLowerCase() === ''
                                        ? client
                                        : client.username.toLowerCase().includes(searchData.toLowerCase())
                                )
                                .map((client, index) => (
                                    <tr
                                        key={client._id} // Add a unique key for each row
                                        className="bg-white border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-600"
                                    >
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {client.username}
                                        </th>
                                        <td className="px-6 py-4">{client.email}</td>
                                        <td className="px-6 py-4">{client.location}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => handleViewDetailsClick(client._id)} className="font-medium text-blue-600 hover:underline">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>



                {/* View Project Details Modal */}
                {showViewClientModal && (
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
                                <ViewClientDetails clientDetails={selectedClient} onClose={handleCloseViewClientModal} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageClients;

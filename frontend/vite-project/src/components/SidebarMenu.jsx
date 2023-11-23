
import React from 'react';
import photo from '../assets/react.svg';
import { Link, useNavigate } from 'react-router-dom';
import navigationItems from '../config/SidebarMenuLinks';


const SidebarMenu = () => {
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();
    const Logout = () => {

        localStorage.removeItem('userRole');
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        console.log('User logged out successfully');
        navigate('/login');
    }
    if (userRole) {
        // Render your sidebar content based on the user role
        return (
            <>
                <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen overflow-y-auto" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 rounded-md">
                        <a href="#" className="flex items-center ps-2.5 mb-5">
                            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" /> */}
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ERP</span>
                        </a>

                        <div className='flex items-center ps-2.5 mb-5 gap-3'>
                            <div className='min-w[1.5rem] h-[1.5rem]'>
                                <img src={photo} alt="" className='w-full h-full rounded-full object-cover' />
                            </div>
                            <div className='text-white'>
                                <div className="text-sm">{localStorage.getItem('userRole')}</div>
                                <div className="">{localStorage.getItem('userEmail')}</div>
                            </div>
                        </div>
                        <ul className="space-y-2 font-medium">
                            {userRole && navigationItems[userRole] && (
                                <>
                                    {navigationItems[userRole].map((item) => (
                                        <li>
                                            <Link
                                                key={item.text}
                                                to={item.to}
                                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <span className="ms-3">{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </>
                            )}
                            <li>
                                <button onClick={Logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                        <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
                                </button>
                            </li>

                        </ul>
                    </div>
                </aside>


            </>
        );
    }
};

export default SidebarMenu;


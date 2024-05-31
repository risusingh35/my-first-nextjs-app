"use client";
import React, { useState,useEffect } from "react";
import HeaderSection from "@/app/components/HeaderSection";
import useDebounce from "@/app/utils/useDebounce"
import FloatingLabelInput from "@/app/components/form/FloatingLabelInput";
import FloatingLabelTextarea from "@/app/components/form/FloatingLabelTextarea";
import { operationAPI } from '@/app/utils/axios';
import { useRouter } from 'next/navigation'

const UserList = () => {
    const router = useRouter()
    const [usersData, setUsersData] = useState([
      
    ]);
   
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await operationAPI(`/users`);
               
                console.log("userData",response);
                setUsersData(response.data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    },[]);
    const handleAddEditButtonClick = (id) => {
        if (id) {
            router.push(`/pages/users/addEdit/${id}`, { scroll: false })
            console.log("Update user button clicked");
        } else {
            console.log("Create user button clicked");
            router.push('/pages/users/addEdit', { scroll: false })
        }
    };
    const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      console.log("Searching for:", debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
    const UserListItem = ({ user }) => {
        return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img className="w-10 h-10 rounded-full" src={user.images} alt={`${user.name} image`} />
                    <div className="ps-3">
                        <div className="text-base font-semibold">{user.name}</div>
                        <div className="font-normal text-gray-500">{user.email}</div>
                    </div>
                </th>
                <td className="px-6 py-4">
                    {user.position}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className={`h-2.5 w-2.5 rounded-full ${user.status ? 'bg-green-500' : 'bg-red-500'} me-2`}></div>
                        {user.status ? 'Online' : 'Offline'}
                    </div>
                </td>
                <td className="px-6 py-4">
                    <button href="#" 
                     onClick={() => handleAddEditButtonClick(user._id)}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</button>
                </td>
            </tr>
        );
    };
    const handleSearchChange = (event) => {
        console.log("Search query:", event.target.value);
        setSearchTerm(event.target.value);
    };
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <HeaderSection
                title="Users List"
                searchPlaceholder="Search Users"
                onSearchChange={handleSearchChange}
                onButtonClick={handleAddEditButtonClick}
                buttonText="Create Users"
            />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Position</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData.map((user, index) => (
                        <UserListItem user={user} key={user._id} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;

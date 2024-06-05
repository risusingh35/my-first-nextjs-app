"use client";
import React, { useState, useEffect, CSSProperties } from "react";
import ListingHeaderSection from "@/app/components/ListingHeaderSection";
import ConfirmModal from "@/app/components/ConfirmModal";
import useDebounce from "@/app/utils/useDebounce";
import { operationAPI ,getAPI} from "@/app/utils/axios";
import { useRouter } from "next/navigation";
import { LiaPhoneSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import roles from "@/app/utils/staticData/roles";
import { MoonLoader } from "react-spinners";
const UserList = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const [isLoader, setIsLoader] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    try {
      const response = await getAPI.get(`/users`);
      console.log("userData", response);
      setUsersData(response.data);
      setIsLoader(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      search(debouncedSearchTerm);
    } else if (!debouncedSearchTerm.length) {
      fetchAllUsers();
    }
  }, [debouncedSearchTerm]);
  const search = async (searchQuery) => {
    console.log("Searching for:", searchQuery);
    try {
      const response = await operationAPI.get(`/users/search`, {
        params: { query: searchQuery },
      });
      console.log("userData", response);
      setUsersData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleAddEditButtonClick = (id) => {
    if (id) {
      router.push(`/pages/users/addEdit/${id}`, { scroll: false });
      console.log("Update user button clicked");
    } else {
      console.log("Create user button clicked");
      router.push("/pages/users/addEdit", { scroll: false });
    }
  };

  const handleDeleteUser = (user) => {
    setSelectedItem(user);
    setIsModalOpen(true);
    console.log("User Deleted", user);
  };
  const handleDelete = async (user) => {
    setIsModalOpen(false);

    const del = await operationAPI.delete(`/users/${selectedItem._id}`);
    toast("User Deleted Successful", {
      role: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    fetchAllUsers();
  };
  const UserListItem = ({ user }) => {
    const getImageUrl = () => {
      if (user.image && user.image.data) {
        const base64String = Buffer.from(user.image.data).toString("base64");
        return `data:image/jpeg;base64,${base64String}`;
      }
      return "";
    };
    const getRole = () => {
      if (user.role) {
        const roleLabel = roles.find((r) => r.value === user.role);
        console.log("roleLabel", roleLabel);
        return roleLabel ? roleLabel.label : "";
      }
      return "";
    };

    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th className="px-6 py-4 text-center">
          <img
            className="w-10 h-10 rounded-full mx-auto"
            src={getImageUrl()}
            alt={`${user.name} image`}
          />
          <div className="text-gray-900 dark:text-white">{user.name}</div>
        </th>

        <td className="px-6 py-4 text-center">
          <div className="flex flex-col items-center">
            <div className="font-normal text-gray-500 mb-2">{user.email}</div>
            <small className="flex items-center">
              <LiaPhoneSolid className="mr-1 h-4 w-4" />
              <span className="text-sm">{user.contact}</span>
            </small>
          </div>
        </td>

        <td className="px-6 py-4 text-center">{user.role}</td>
        <td className="px-6 py-4 text-center">
          <div className="flex justify-center">
            <div
              className={`h-5 w-5 rounded-full ${
                user.status ? "bg-green-500" : "bg-red-500"
              } me-2`}
            ></div>
          </div>
        </td>
        <td className="px-6 py-4 text-center">
          <button
            href="#"
            onClick={() => handleAddEditButtonClick(user._id)}
            className="font-medium text-3xl  p-2 text-blue-600 dark:text-blue-500 hover:text-white hover:bg-indigo-600"
          >
            <FaEdit />
          </button>
          <button
            href="#"
            onClick={() => handleDeleteUser(user)}
            className="font-medium text-3xl p-2 text-red-500 dark:text-blue-500 hover:text-white hover:bg-[#ff014f]"
          >
            <MdDelete />
          </button>
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
      <ToastContainer />

      <ListingHeaderSection
        title="Users List"
        searchPlaceholder="Search Users"
        onSearchChange={handleSearchChange}
        onButtonClick={handleAddEditButtonClick}
        buttonText="Create Users"
      />
      {isLoader && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50  p-5">
          <MoonLoader color="#ff014f" />
        </div>
      )}

      <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <UserListItem user={user} key={user._id} />
          ))}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={isModalOpen}
        message={`Are you sure you want to delete user?`}
        itemName={`User`}
        selectedItem={selectedItem.email}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserList;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import FloatingLabelInput from "@/app/components/form/FloatingLabelInput";
import FloatingLabelSelect from "@/app/components/form/FloatingLabelSelect";
import FormHeaderWithBackButton from "@/app/components/form/FormHeaderWithBackButton";
import roles from "@/app/utils/staticData/roles";
import { operationAPI ,getAPI} from "@/app/utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddEditUser = () => {
  const backUrl = "/pages/users/list";
  const router = useRouter();
  const { id } = useParams();
  const [formState, setUsersData] = useState({
    name: "",
    role: "",
    status: false,
    email: "",
    contact: "",
    _id: null,
    imageUrl: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const response = await getAPI.get(`/users/${id}`);
          setUsersData(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUsersData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("role", formState.role);
    formData.append("status", formState.status);
    formData.append("email", formState.email);
    formData.append("contact", formState.contact);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (formState._id) {
       
        await operationAPI
          .put(`/users/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }) .then((res) => {
            if(res.status === 200){
              shadowToast('User Updated Successful')
              backtoListPage()
            }
          });
      } else {
        await operationAPI
          .post(`/users`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }) .then((res) => {
            if(res.status === 201){
              shadowToast('User Created Successful')
              backtoListPage()
            }
          });
      }
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };
  const backtoListPage = () => {
    
    router.push(backUrl)
  };
  const shadowToast= (msg)=>{
    toast(msg, {
      role: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  return (
    <div>
        <ToastContainer />
      <FormHeaderWithBackButton
        title={formState._id ? "Edit User" : "Create User"}
        backUrl={backUrl}
      />
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white my-5 rounded-lg shadow-lg">
          <form className="mt-2" onSubmit={handleSubmit}>
            <FloatingLabelInput
              label="Name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
            <FloatingLabelSelect
              label="Select a Position"
              name="role"
              value={formState.role}
              onChange={handleInputChange}
              options={roles}
            />
            <FloatingLabelInput
              label="Email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
            <FloatingLabelInput
              label="Contact"
              name="contact"
              value={formState.contact}
              onChange={handleInputChange}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="mt-1 block w-full"
              />
            </div>
            <div className="flex items-center mt-4">
              <span className="ml-2 text-gray-700">Status</span>
              <label className="block ml-4">
                <input
                  type="checkbox"
                  name="status"
                  checked={formState.status}
                  onChange={() =>
                    setUsersData((prev) => ({ ...prev, status: !prev.status }))
                  }
                  className="hidden"
                />
                <div
                  className={`relative w-12 h-6 transition duration-200 ease-linear rounded-full ${
                    formState.status ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute left-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full shadow-md transform transition-transform duration-200 ease-linear ${
                      formState.status
                        ? "translate-x-full border-green-500"
                        : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 w-full text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
            >
              {formState._id ? "Update User" : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditUser;

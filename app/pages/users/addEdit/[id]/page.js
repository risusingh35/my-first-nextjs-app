"use client";
import React, { useState, useEffect } from "react";
import FloatingLabelInput from "@/app/components/form/FloatingLabelInput";
import FloatingLabelSelect from "@/app/components/form/FloatingLabelSelect";
import { useRouter, useParams } from "next/navigation";
import position from "@/app/utils/staticData/position";
import { operationAPI } from "@/app/utils/axios";

const AddEditUser = ({ user, setUsersData, usersData }) => {
  const router = useRouter();
  const { id } = useParams();
  console.log("id--------------", id);
  const [formState, setFormState] = useState({
    name: "",
    position: "",
    status: false,
    email: "",
    contact: "",
    _id: null,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await operationAPI(`/users/${id}`);
        console.log("userData", response.data);
        setFormState(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState._id) {
      const updatedUsers = usersData.map((u) =>
        u._id === formState._id ? formState : u
      );
      setUsersData(updatedUsers);
    } else {
      const newUser = { ...formState, _id: Date.now().toString() };
      setUsersData([...usersData, newUser]);
    }
    setFormState({
      name: "",
      position: "",
      status: false,
      email: "",
      contact: "",
      _id: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <FloatingLabelInput
        label="Name"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
      />

      <FloatingLabelSelect
        label="Select a Position"
        name="position"
        value={formState.position}
        onChange={handleInputChange}
        options={position}
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
      <label className="block mb-2">
        <input
          type="checkbox"
          name="status"
          checked={formState.status}
          onChange={() =>
            setFormState((prev) => ({ ...prev, status: !prev.status }))
          }
        />
        Status
      </label>
      <button type="submit" className="btn btn-primary mt-2">
        {formState._id ? "Update User" : "Create User"}
      </button>
    </form>
  );
};

export default AddEditUser;

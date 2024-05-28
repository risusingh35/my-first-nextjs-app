"use client"
import { useState } from "react";
import FloatingLabelInput from "@/app/components/form/FloatingLabelInput";
import FloatingLabelTextarea from "@/app/components/form/FloatingLabelTextarea";
import {operationAPI} from '../../utils/axios';
export default function Contact() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyEmail: '',
    phone:'',
    message:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    console.log('Form Data:', formData);
    try {
      const response = await operationAPI.post('/contactus',formData);
      console.log('Response',response);
    }  catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
    }
  
  return (
    <div className='w-full h-full'>
      <div className='flex'>
        <div className='w-1/2 flex flex-col justify-arround items-start p-8  items-center h-min'>

          <h1 className="text-5xl font-extrabold my-4">
            Let&rsquo;s Get Started
          </h1>
          <p className="px-24 mt-5">
            We offer full-cycle technology solutions that streamline your digital transformation journey. With cutting-edge technical expertise, We simplifies complex business challenges with innovative solutions for 100+ fastest-growing enterprises.
          </p>
        </div>
        <div className='w-1/2  p-8  bg-gray-100 '>
          <div className=" w-full h-full p-2">
            <h1 className="text-5xl font-extrabold my-4">
              Let&rsquo;s Get Started
            </h1>

            <form onSubmit={handleSubmit} className="pt-4">
              <FloatingLabelInput
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Company Email"
                type="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Phone Number"
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <FloatingLabelTextarea
                label="Message"
                type="phone"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
                 {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>


  );
}

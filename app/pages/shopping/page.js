"use client"
import React, { useState } from "react";
import products from '@/api/productItemList';
import axios from "axios";
const Shopping = () => {

    const CartsItem = ({ item }) => {
        const [loading,setLoading]=useState(false)
        const checkoutButton = async (checkoutItem) => {
            setLoading(true);
            try {
                const response = await axios.post('/api/payment', {
                    checkoutItem
                });
                const responseData = await response.data;
                console.log('responseData', responseData);
                window.location.href=responseData.url
            } catch (error) {
                console.error("checkoutButton Error:", error.message);
            } finally {
                setLoading(false);
            }
        };
       
        return (
            <div className="p-4 w-full md:w-1/2">
                <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden bg-white">
                   
                    <div className="h-64 overflow-hidden">
                        <img alt="content" className="object-contain object-center h-full w-full" src={item.image}/>
                    </div>
                    <div className="p-6">
                        <h2 className="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">{item.title}</h2>
                        <p className="leading-relaxed text-base">{item.description}</p>
                        <button
                        onClick={()=>checkoutButton(item)}
                        disabled={loading}
                        className="flex mx-auto mt-6 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded">
                           {loading ? "Loading..." : `Pay ₹${item.price}`}
                            
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    const addCard=async ()=>{
        try {
            const response = await axios.post('/api/addcard');
            console.log('response', response);
            // window.location.href=responseData.url
        } catch (error) {
            console.error("checkoutButton Error:", error.message);
        } 
    }
    return (
        <section className="container mx-auto pt-4 py-24">
            <div className="flex flex-wrap -m-4">
                {products.map((item, index) => (
                    <CartsItem item={item} key={index} />
                ))}
            </div>
        </section>
    );
}

export default Shopping;

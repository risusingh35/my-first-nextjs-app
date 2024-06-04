"use client";
import React from 'react';
import Link from 'next/link';
import {  useSelector } from "react-redux";
const HeaderNav = () => {
    const count = useSelector((state) => state.counter.value); // Access the counter state
    return (
        <nav className="bg-gray-800 text-white">
            <div className="container mx-auto flex flex-wrap items-center justify-between h-20 px-4">
                <Link href="/" className="flex items-center">
                    <img className="rounded-full" src="https://media.licdn.com/dms/image/D4E03AQF8VYPM11U_VQ/profile-displayphoto-shrink_200_200/0/1682953959524?e=1721865600&v=beta&t=heQCVumdsRKd5qAUQsvQqgDMQhj7uA3msRu2fijm0Pk" height={70} width={70} alt="Logo" />
                </Link>
                <div className="flex-grow flex items-center justify-around space-x-4 mt-4 lg:mt-0">
                    <Link href="/pages/dashboard">
                        <span className="hover:text-gray-400">Dashboard</span>
                    </Link>
                    <Link href="/pages/about">
                        <span className="hover:text-gray-400">About</span>
                    </Link>
                    <Link href="/pages/services">
                        <span className="hover:text-gray-400">Services</span>
                    </Link>
                    <Link href="/pages/contact">
                        <span className="hover:text-gray-400">Contact</span>
                    </Link>
                    <Link href="/pages/login">
                        <span className="hover:text-gray-400">Login</span>
                    </Link>
                    <Link href="/pages/shopping">
                        <span className="hover:text-gray-400">Shopping</span>
                    </Link>
                    <Link href="/pages/counter">
                        <span className="hover:text-gray-400">Counter</span>
                    </Link>
                    <Link href="/pages/users/list">
                        <span className="hover:text-gray-400">Users</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNav;
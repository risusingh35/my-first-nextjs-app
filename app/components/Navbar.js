"use client";

import React, { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import { usePathname } from 'next/navigation'
import { FiUser, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine icon based on route name prefix
  const getIcon = (routeName) => {
    if (routeName.startsWith("/pages/users")) {
      return <FiUser size={24} />;
    } else if (routeName.startsWith("/pages/shopping")) {
      return <FiShoppingCart size={24} />;
    }
    // Add more conditions for other route prefixes if needed
    // Default return null
    return null;
  };

  return (
    <nav
      className={`fixed top-0 left-0 bg-gray-800 text-white w-64 h-full flex flex-col ${
        isOpen ? "md:w-64" : "md:w-24"
      }`}
    >
      <div className="px-4 py-4 flex items-end">
        <button onClick={toggleSidebar}>
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </button>
      </div>
      <div
        className={`flex flex-col h-full justify-evenly md:pl-5 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link href="/" className="nav-link hover:text-gray-300 flex " activeClassName="active-link" exact>
          <Image
            className="rounded-full"
            src="https://media.licdn.com/dms/image/D4E03AQF8VYPM11U_VQ/profile-displayphoto-shrink_200_200/0/1682953959524?e=1721865600&v=beta&t=heQCVumdsRKd5qAUQsvQqgDMQhj7uA3msRu2fijm0Pk"
            height={70}
            width={70}
            alt="Logo"
          />
        </Link>
        <Link href="/pages/about" className={`nav-link hover:text-gray-300 flex  ${pathname === '/pages/about' ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/about")}
          About
        </Link>
        <Link href="/pages/services" className={`nav-link hover:text-gray-300 flex  ${pathname === '/pages/services' ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/services")}
          Services
        </Link>
        <Link href="/pages/contact" className={`nav-link hover:text-gray-300 flex  ${pathname === '/pages/contact' ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/contact")}
          Contact
        </Link>
        <Link href="/pages/login" className={`nav-link hover:text-gray-300 flex  ${pathname === '/pages/login' ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/login")}
          Login
        </Link>
        <Link href="/pages/shopping" className={`nav-link hover:text-gray-300 flex  ${pathname === '/pages/shopping' ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/shopping")}
          Shopping
        </Link>
        <Link href="/pages/counter" className={`nav-link hover:text-gray-300 flex  ${pathname === '/pages/counter' ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/counter")}
          Counter
        </Link>
        <Link href="/pages/users/list" className={`nav-link hover:text-gray-300 flex  ${pathname.includes('/pages/users/') ? 'text-[#ff014f]' : ''}`} activeClassName="active-link">
          {getIcon("/pages/users/list")}
          Users
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

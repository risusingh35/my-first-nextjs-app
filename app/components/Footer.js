'use client';
import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaFacebook, FaInstagramSquare, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const year = new Date().getFullYear();
    setCurrentYear(year);
  }, []);

  const SocialIcon = ({ className, icon: Icon, href }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="text-[#ff014f] bg-transparent mx-2 shadow hover:shadow-lg">
        <Icon className={`p-2 ${className}`} />
      </div>
    </Link>
  );

  return (
    <footer className="w-full bg-gray-300">
      <div className="container mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center justify-center md:justify-start text-gray-900 mb-4 sm:mb-0">
          <span className="text-xl font-medium">Risu Singh</span>
        </div>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2">
          © {currentYear} Tailblocks —
          <a href="mailto:risusingh35@gmail.com" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">
            @risusingh35@gmail.com
          </a>
        </p>
        <div className="flex justify-center sm:justify-start mt-4 sm:mt-0">
          <SocialIcon className="text-3xl" icon={FaLinkedin} href="https://www.linkedin.com/in/risu-singh-7631b1a5/" />
          <SocialIcon className="text-3xl" icon={FaFacebook} href="https://www.facebook.com/risusingh7771815989" />
          <SocialIcon className="text-3xl" icon={FaInstagramSquare} href="https://www.instagram.com/rishusinghrk/" />
          <SocialIcon className="text-3xl" icon={FaGithub} href="https://github.com/risusingh35" />
        </div>
      </div>
    </footer>
  );
}

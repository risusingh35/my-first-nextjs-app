import React from 'react';
import Link from 'next/link';

const HeaderNav = () => {
    return (
        <nav className="flex justify-between items-center h-20 px-4 bg-gray-800 text-white">
            <div className='w-screen'>
                <div className='mx-auto flex justify-around items-center'>
                    <Link href="/" className="flex items-center">
                        <img className='rounded-full' src='https://media.licdn.com/dms/image/D4E03AQF8VYPM11U_VQ/profile-displayphoto-shrink_200_200/0/1682953959524?e=1721865600&v=beta&t=heQCVumdsRKd5qAUQsvQqgDMQhj7uA3msRu2fijm0Pk' height={70} width={70} />
                        <span className="text-xl font-bold">Risu Singh</span>
                    </Link>
                    <Link href="/">
                        <span className="hover:text-gray-400">Home</span>
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
                </div>


            </div>
        </nav>
    );
};

export default HeaderNav;
'use client';
import Typewriter from 'typewriter-effect';
import { FaLinkedin, FaFacebook, FaInstagramSquare ,FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image'
import { operationAPI ,getAPI} from "@/app/utils/axios";
export default function Home() {
  const words = ['FullStack Developer', 'MERN Developer', "MEAN Developer", "MEVM Developer", 'NodeJS Developer', "ReactJS Developer", "AngularJS Developer", "VueJS Developer"];
  const SocialIcon = ({ className, icon: Icon, href }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className="text-[#ff014f] rounded-lg border bg-gray-100 px-4 py-3 m-2 shadow hover:bg-gray-300 hover:shadow-lg">
        <Icon className={className} />
      </div>
    </Link>
  );
  setInterval(()=>{
    const response = getAPI.get(`/users`);
    console.log("userData", response);
  },(10*60*1000))
  return (
    <div className='w-full h-full'>
      <div className='flex'>
        <div className='w-2/3 flex flex-col justify-arround items-start p-8  items-center h-min'>
          <p className='text-xl'>Welcome to my world</p>
          <h1 className='text-5xl font-extrabold mt-4'>
            Hi, I&rsquo;m
            <span className='text-[#ff014f] ml-2'>
              RISU SINGH
            </span>
          </h1>
          <h1 className='text-5xl font-extrabold mt-4'>
            <Typewriter
              options={{
                strings: words,
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className='p-2 m-4'>
            <p>
              I use animation as a third dimension by which to simplify experiences and kuiding thro each and every interaction. I’m not adding motion just to spruce things up, but doing it in ways that
            </p>
          </div>
          <div className='flex w-full justify-center '>
            <div className=''>
              <div className=''>
                FIND WITH ME
              </div>
              <div className="flex justify-center w-1/2 p-2 mx-4">
                <SocialIcon className="text-3xl" icon={FaLinkedin} href="https://www.linkedin.com/in/risu-singh-7631b1a5/" />
                <SocialIcon className="text-3xl" icon={FaFacebook} href="https://www.facebook.com/risusingh7771815989" />
                <SocialIcon className="text-3xl" icon={FaInstagramSquare} href="https://www.instagram.com/rishusinghrk/" />
              </div>
            </div>
             
            <div className=''>
              <div className=' justify-items-start'>
                FIND WITH ME
              </div>
              <div className="flex justify-center w-1/2 p-2 mx-4">
                <SocialIcon className="text-3xl" icon={FaGithub} href="https://github.com/risusingh35" />
                {/* <SocialIcon className="text-3xl" icon={FaFacebook} href="https://www.facebook.com/risusingh7771815989" />
                <SocialIcon className="text-3xl" icon={FaInstagramSquare} href="https://www.instagram.com/your-profile" /> */}
              </div>
            </div>

          </div>
        </div>
        <div className='w-1/3 flex justify-center  bg-gray-100 h-min'>
          <div className='flex justify-center m-4 p-4'>
            <Image
              src="https://media.licdn.com/dms/image/D4E03AQF8VYPM11U_VQ/profile-displayphoto-shrink_200_200/0/1682953959524?e=1721865600&v=beta&t=heQCVumdsRKd5qAUQsvQqgDMQhj7uA3msRu2fijm0Pk"
              alt="Profile"
              className='h-48 w-48'
              width={50}
              height={50}
              quality={100}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
  // VercelToken-M8tX0xKQxcX3afdEdGjMERUM
  // https://rainbowit.net/html/inbio/index-white-version.html
}

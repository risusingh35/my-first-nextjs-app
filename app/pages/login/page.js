"use client"
import React, { useCallback, useRef, useState } from "react";
// import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic';

const LoginSocialGoogleClient = dynamic(() => import('reactjs-social-login').then(module => module.LoginSocialGoogle), { ssr: false });
const LoginSocialFacebookClient = dynamic(() => import('reactjs-social-login').then(module => module.LoginSocialFacebook), { ssr: false });

// Now you can use LoginSocialGoogleClient and LoginSocialFacebookClient components in your JSX code

// import {
//   LoginSocialGoogle,
//   LoginSocialFacebook
// } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";

// const REDIRECT_URI = "http://localhost:3000/pages/login";

import axiosInstance from '../../utils/axios';

export default function LoginForm() {
//   const router = useRouter();
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosInstance.post('/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      console.log('Login successful');
      // Redirect to home page or any other page
    //   router.push('/');
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();
  const googleRef = useRef();
  const facebookRef = useRef();

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
      <div className="bg-pink-200 p-8 rounded-lg shadow-lg max-w-md w-1/2">
        <h2 className="text-2xl font-bold mb-6 text-center">Social Login</h2>
        <LoginSocialFacebookClient
          ref={facebookRef}
          appId={"78078035866-knakb2rn4g1od8au9uh25ptrbpb52l3b.apps.googleusercontent.com"}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            console.log(data, "data");
            console.log(provider, "provider");
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebookClient>

        <LoginSocialGoogleClient
          ref={googleRef}
          client_id="1024616921919-hns9m0q39jb21qrp4kpb57kti2sd5t1n.apps.googleusercontent.com"
          onLogoutFailure={onLogoutFailure}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            console.log(data, "data");
            console.log(provider, "provider");
          }}
          onReject={(err) => {
            console.log("hbhbdhd", err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogleClient>
      </div>
    </div>
  );
}

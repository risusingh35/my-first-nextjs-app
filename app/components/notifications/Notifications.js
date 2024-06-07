"use client"
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const socket = io('http://localhost:4001'); // Adjust the URL as necessary

const Notifications = () => {
  useEffect(() => {
    // Listen for 'userCreated' event from server
    // socket.on('userCreated', (data) => {
    //   toast.success(`${data.user.name} has been created.`);
    // });
    socket.on('testEmitter', (data) => {
      console.log('data Notifications',data);
      toast.success(`${data.msg}`);
    });
    // Cleanup the effect
    return () => {
      socket.off('userCreated');
    };
  }, []);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Notifications;

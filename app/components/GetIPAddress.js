import React, { useState } from 'react';
import { operationAPI ,getAPI} from "@/app/utils/axios";

const GetIPAddress = () => {
  const [websiteName, setWebsiteName] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleGetIP = async () => {
    try {
      const response = await getAPI.get(`/convert/ip?websiteName=${websiteName}`);
      setResponseData(response.data);
    } catch (error) {
      console.error('Error fetching IP:', error);
      setResponseData({ error: 'Error fetching IP' });
    }
  };
  const formatFamily = (family) => {
    switch(family) {
      case 4:
        return "IPv4";
      case 6:
        return "IPv6";
      case 0:
      default:
        return "IPv4 and IPv6";
    }
  }
  return (
    <div className="max-w-md mx-auto">
      <input
        type="text"
        value={websiteName}
        onChange={(e) => setWebsiteName(e.target.value)}
        placeholder="Enter website name (e.g., www.google.com)"
        className="mt-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
      <button onClick={handleGetIP}  className="w-full flex justify-center mt-3 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Get IP
      </button>
      {responseData && (
        <div className="mt-4">
          <p className="text-gray-700">
            <span className="font-semibold">IP Address:</span> {responseData.ip}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Hostnames:</span> {responseData.hostnames}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Family:</span> {formatFamily(responseData.family)}
          </p>
        </div>
      )}
    </div>
  );
};

export default GetIPAddress;

"use client";
import { Fragment, useEffect, useState } from "react";
import { getAPI } from "@/app/utils/axios"; // Assuming `getAPI` is your Axios instance for GET requests

const Profiler = () => {
  const [streamData, setStreamData] = useState();
  const [isNodeProfiler, setIsNodeProfiler] = useState(true);
  const [simulateIOData, setSimulateIOData] = useState(null);
  const [cpuIntensiveData, setCpuIntensiveData] = useState(null);
  const readLargeFileStream = async () => {
    try {
      const { data } = await getAPI.get("/readlargefilestream");
      console.log("fileData ", data);
      setStreamData(data); // Set the fetched stream data
    } catch (error) {
      console.log("Error while fetching readLargeFileStream data");
    }
  };

  const fetchSimulateCpuIntensive = async (useWorker) => {
    setCpuIntensiveData(null);
    const endpoint = useWorker ? '/profiler/cpu-intensive-worker' : '/profiler/cpu-intensive-no-worker';
    try {
      const response = await getAPI.get(endpoint);
      const data = response.data.
      result;
      console.log('data------',data);
      setCpuIntensiveData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchSimulateIO = async () => {
    let profilerData, data;
    try {
      if (isNodeProfiler) {
        data = await getAPI.get("/profiler/simulate-io");
      } else {
        data = await operationAPI.get("/profiler/simulate-io");
      }
      profilerData = data.data;
      setSimulateIOData(profilerData);
    } catch (error) {
      console.log("Error while fetching profiler data");
    }
  };
  const handleProfilerChange = () => {
    setIsNodeProfiler(!isNodeProfiler);
  };

  return (
    <Fragment>
      <h1 className="text-3xl font-bold mb-4">Backend Profiler</h1>
      <div className="flex mb-4">
      <div className="mr-4">
      <h2 className="font-bold">Simulate a CPU-intensive task</h2>
      <button
        className="px-4 py-2 rounded bg-green-500 text-white mr-2"
        onClick={() => fetchSimulateCpuIntensive(false)}
      >
        Simulate CPU Task No Worker
      </button>
      <button
        className="px-4 py-2 rounded bg-green-500 text-white"
        onClick={() => fetchSimulateCpuIntensive(true)}
      >
        Simulate CPU Task With Worker
      </button>
      <div className="mt-4 border border-gray-300 p-4 rounded">
        {cpuIntensiveData && (
          <pre className="whitespace-pre-wrap">
            Result: {cpuIntensiveData?.result}
            <br />
            Duration: {cpuIntensiveData?.duration} ms
            <br />
            Method: {cpuIntensiveData?.method}
          </pre>
        )}
      </div>
    </div>
        <div>
          <h2 className="font-bold">Simulate an I/O operation</h2>
          <button
            className="px-4 py-2 rounded bg-blue-500 text-white"
            onClick={() => fetchSimulateIO()}
          >
            Simulate I/O Task
          </button>
          <div className="mt-4 border border-gray-300 p-4 rounded">
            <pre className="whitespace-pre-wrap">
              {simulateIOData?.ioResult}
            </pre>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-md p-4 mb-4">
    <h1 className="text-2xl font-bold mb-2">
        Read Large Text File Using <strong>createReadStream</strong>:
    </h1>
    <button
        onClick={readLargeFileStream}
        className="px-4 py-2 rounded bg-indigo-500 text-white mr-2"
    >
        Read File Now
    </button>
</div>
<div className="border border-gray-300 rounded-md p-4">
    <pre className="whitespace-pre-wrap">File Size(MB): 
        <span className="text-green-600 font-bold">{streamData?.fileSizeMB}</span>
    </pre>
    <pre className="whitespace-pre-wrap">Total Character: 
        <span className="text-blue-600 font-bold">{streamData?.charCount}</span>
    </pre>
    <pre className="whitespace-pre-wrap">{streamData?.fileData}</pre>
</div>

    </Fragment>
  );
};

export default Profiler;

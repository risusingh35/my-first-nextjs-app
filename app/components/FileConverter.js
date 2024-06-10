import React, { useState } from 'react';

const FileConverter = () => {
  const [file, setFile] = useState(null);
  const [currentEncoding, setCurrentEncoding] = useState('utf8');
  const [targetEncoding, setTargetEncoding] = useState('utf8');
  const [processing, setProcessing] = useState(false);
  const [convertedFile, setConvertedFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleConvert = async () => {
    setProcessing(true);
    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('currentEncoding', currentEncoding);
        formData.append('targetEncoding', targetEncoding);
  
        const response = await getAPI.post('/convert/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setConvertedFile(response.data);
        setProcessing(false);
      }  catch (error) {
      console.error('Error converting file:', error);
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([convertedFile], { type: `text/plain; charset=${targetEncoding}` });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_file.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="mb-4 mt-3">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
          Choose a file
        </label>
        <input
          id="file"
          type="file"
          onChange={handleFileChange}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-white pl-3 pr-10 py-2 border border-slate-500 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="currentEncoding" className="block text-sm font-medium text-gray-700 mb-1">
          Current Encoding
        </label>
        <select
          id="currentEncoding"
          value={currentEncoding}
          onChange={(e) => setCurrentEncoding(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white border border-slate-500 rounded-md"
        >
          <option value="utf8">UTF-8</option>
          <option value="utf16">UTF-16</option>
          {/* Add more encoding options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="targetEncoding" className="block text-sm font-medium text-gray-700 mb-1">
          Target Encoding
        </label>
        <select
          id="targetEncoding"
          value={targetEncoding}
          onChange={(e) => setTargetEncoding(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white border border-slate-500 rounded-md"
        >
          <option value="utf8">UTF-8</option>
          <option value="utf16">UTF-16</option>
          {/* Add more encoding options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <button
          onClick={handleConvert}
          disabled={!file || processing}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {processing ? 'Converting...' : 'Convert'}
        </button>
      </div>
      {convertedFile && (
        <div className="mb-4">
          <p className="font-medium text-gray-700">Converted File Available</p>
          <button
            onClick={handleDownload}
            className="mt-1 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download Converted File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileConverter;

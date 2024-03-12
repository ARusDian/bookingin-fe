import React, { useState } from 'react';

const FlightForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [acceptedPolicy, setAcceptedPolicy] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList[0]);
    }
  };

  const handlePolicyChange = () => {
    setAcceptedPolicy(!acceptedPolicy);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file && acceptedPolicy) {
      console.log('File:', file);
      console.log('Accepted Policy:', acceptedPolicy);
    } else {
      alert('Please upload a file and accept the policy to proceed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-6  rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Unggah bukti pembayaran:
        </label>
        <input type="file" id="file" onChange={handleFileChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500" />
      </div>
      <div className="mb-4">
        <label className="flex items-center">
          <input type="checkbox" checked={acceptedPolicy} onChange={handlePolicyChange} className="form-checkbox h-4 w-4 text-pink-600" />
          <span className="ml-2 text-sm text-gray-700">I accept the policies</span>
        </label>
      </div>
      <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-100">
        Order
      </button>
    </form>
  );
};

export default FlightForm;

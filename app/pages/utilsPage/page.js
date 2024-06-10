"use client"
import React, { useState } from "react";
import GetIPAddress from "@/app/components/GetIPAddress";
import FileConverter from "@/app/components/FileConverter";

const ComponentSelector = ({ options, selectedComponent, onChange }) => {
  return (
    <div className="mb-4">
      {options.map((option) => (
        <React.Fragment key={option.value}>
          <input
            type="radio"
            id={option.value}
            name="component"
            value={option.value}
            checked={selectedComponent === option.value}
            onChange={onChange}
          />
          <label htmlFor={option.value} className="ml-2 mr-4">
            {option.label}
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};

const UtilsPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("fileConverter");

  const handleChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  const componentOptions = [
    { label: "File Converter", value: "fileConverter" },
    { label: "Get IP Address", value: "getIPAddress" },
    // Add more options for future components
  ];

  return (
    <div className="max-w-lg mx-auto my-8">
      <ComponentSelector
        options={componentOptions}
        selectedComponent={selectedComponent}
        onChange={handleChange}
      />
      {selectedComponent === "fileConverter" && <FileConverter />}
      {selectedComponent === "getIPAddress" && <GetIPAddress />}
      {/* Add more components based on selectedComponent */}
    </div>
  );
};

export default UtilsPage;

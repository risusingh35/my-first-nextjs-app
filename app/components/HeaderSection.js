import React from "react";

const HeaderSection = ({ title, searchPlaceholder, onSearchChange, onButtonClick, buttonText }) => {
  return (
    <div className="flex p-3 justify-between text-3xl bg-gray-300">
      <h1 className="py-2 px-5">{title}</h1>
      <div>
        <input
          className="text-black border-0 py-2 px-5 rounded focus:outline-none"
          type="text"
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
        />
        <button
          className="ml-3 text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;

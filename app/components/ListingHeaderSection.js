import React from "react";

const ListingHeaderSection = ({ title, searchPlaceholder, onSearchChange, onButtonClick, buttonText }) => {
  return (
    <div className="flex flex-col sm:flex-row p-3 justify-between items-center text-3xl bg-gray-300">
      <h1 className="py-2 px-5">{title}</h1>
      <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row items-center">
        <input
          className="text-black border-0 py-2 px-5 rounded focus:outline-none mb-2 sm:mb-0 sm:mr-3"
          type="text"
          placeholder={searchPlaceholder}
          onChange={onSearchChange}
        />
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-5 focus:outline-none hover:bg-indigo-600 rounded"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ListingHeaderSection;

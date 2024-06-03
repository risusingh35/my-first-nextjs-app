import React, { useState } from "react";
import { IoMdWarning } from "react-icons/io";
const ConfirmModal = ({
  isOpen,
  message,
  selectedItem,
  itemName,
  onConfirm,
  onCancel,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue.toLowerCase() === selectedItem.toLowerCase()) {
      onConfirm();
    }
  };

  const handleCancel = () => {
    onCancel();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="p-2  flex items-center justify-center bg-red-100 rounded-full mr-2">
                <IoMdWarning className="text-red-500 text-2xl" />
              </div>
              <h1 className="text-lg">Delete {itemName}</h1>
            </div>
            <p className="text-lg mt-3">
              {message} <span className="text-red-500">{selectedItem}</span>
            </p>
            <p className="text-sm text-gray-500">
              Type &quot; {selectedItem} &quot; to confirm your action
            </p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mt-2 w-full"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white px-4 py-2 rounded mr-4"
              >
                Cancel
              </button>
              <button
                disabled={inputValue !== selectedItem}
                onClick={handleConfirm}
                className={`px-4 py-2 rounded ${
                  inputValue === selectedItem ? "bg-green-500" : "bg-gray-500"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;

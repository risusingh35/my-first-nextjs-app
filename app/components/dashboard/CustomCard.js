import React from 'react';

const CustomCard = ({ title, icon, symbol = '', CardText }) => {
  return (
    <div className="w-150 h-200 bg-gray-800 text-white border border-gray-300 rounded-lg shadow-md p-4">
      <div className="flex justify-between">
        <p className="text-1xl">{title}</p>
        <div className="rounded-full bg-white text-gray-900 p-1">
          {icon}
        </div>
      </div>
      <div className="flex justify-start text-3xl mt-5 p-2">
        {symbol && <p>{symbol}</p>}
        <p className={symbol ? 'ml-3' : ''}>{CardText}</p>
      </div>
    </div>
  );
};

export default CustomCard;

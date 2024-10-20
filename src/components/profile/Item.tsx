import React from "react";

interface ItemProps {
  type: string;
  title: string;
  status: string;
}

const Item: React.FC<ItemProps> = ({ type, title, status }) => {
  return (
    <div className="flex justify-between p-4 border-b border-gray-300">
      <div className="font-semibold">{type}</div>
      <div className="">{title}</div>
      <div
        className={`text-lg ${
          status === "✓" ? "text-green-600" : "text-red-600"
        }`}
      >
        {status}
      </div>
    </div>
  );
};

export default Item;

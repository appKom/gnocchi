import React from "react";

interface ItemProps {
  type: string;
  title: string;
  status: React.ReactNode;
  isExpanded?: boolean;
  isCompleted?: boolean;
}

const Item: React.FC<ItemProps> = ({
  type,
  title,
  status,
  isExpanded = false,
  isCompleted = false,
}) => {
  return (
    <div
      className={`flex items-center p-4 mb-2 bg-[#99CAB5] ${
        status === "✓" ? "border-l-[#B5FFA8]" : "border-l-[#DA4943]"
      } border-l-4`}
    >
      <div className="w-6 h-6 mr-4">
        {isExpanded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        )}
      </div>
      <div className="w-40 text-left flex-grow">{type}</div>

      <div className="flex-grow text-left w-40 font-bold">{title}</div>

      <div className="flex-grow text-right text-lg">
        <span
          className={
            status === "✓"
              ? "text-[#B5FFA8] font-bold"
              : "text-[#DA4943] font-bold"
          }
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default Item;

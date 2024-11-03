import React from "react";

const ProfileCard: React.FC = () => {
  return (
    <div className="w-64 h-64 bg-[#669782] text-white p-8 rounded-xl">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-500 rounded-full mb-4"></div>
        <h2 className="text-xl mb-2">Ola Nordmann</h2>
        <p className="text-sm">ola@nordmann.no</p>
        <p className="text-sm">Dotkom, Velkom</p>
      </div>
    </div>
  );
};

export default ProfileCard;

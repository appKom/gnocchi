import React, { useState } from "react";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Aktive" | "Historikk">("Aktive");

  return (
    <div className="flex mb-4 ">
      <button
        className={`px-4 py-2 rounded-xl ${
          activeTab === "Aktive" ? "bg-[#99CAB5]" : "bg-[#2D433A] text-white"
        }`}
        onClick={() => setActiveTab("Aktive")}
      >
        Aktive
      </button>
      <button
        className={`px-4 py-2 ml-2 rounded-xl ${
          activeTab === "Historikk" ? "bg-[#99CAB5]" : "bg-[#2D433A] text-white"
        }`}
        onClick={() => setActiveTab("Historikk")}
      >
        Historikk
      </button>
    </div>
  );
};

export default Tabs;

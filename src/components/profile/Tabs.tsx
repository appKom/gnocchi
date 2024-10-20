import React, { useState } from "react";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Aktive" | "Historikk">("Aktive");

  return (
    <div className="flex mb-4">
      <button
        className={`px-4 py-2 ${
          activeTab === "Aktive" ? "bg-green-700 text-white" : "bg-green-300"
        }`}
        onClick={() => setActiveTab("Aktive")}
      >
        Aktive
      </button>
      <button
        className={`px-4 py-2 ml-2 ${
          activeTab === "Historikk" ? "bg-green-700 text-white" : "bg-green-300"
        }`}
        onClick={() => setActiveTab("Historikk")}
      >
        Historikk
      </button>
    </div>
  );
};

export default Tabs;

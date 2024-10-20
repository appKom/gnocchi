import React from "react";
import Item from "./Item";

const itemList = [
  { type: "Fondet", title: "Sofa", status: "✓" },
  { type: "Fondet", title: "Støtte til årerturen", status: "✕" },
  { type: "Onlinepotten", title: "Arbeidskveld", status: "✓" },
  { type: "Kvitteringskjema", title: "Flyreise", status: "✓" },
  { type: "Kvitteringskjema", title: "Arbeidskveld", status: "✕" },
];

const ItemList: React.FC = () => {
  return (
    <div className="border-t border-gray-300">
      {itemList.map((item, index) => (
        <Item
          key={index}
          type={item.type}
          title={item.title}
          status={item.status}
        />
      ))}
    </div>
  );
};

export default ItemList;

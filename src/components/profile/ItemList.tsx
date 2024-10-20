import React from "react";
import Item from "./Item";

const itemList = [
  { type: "Fondet", title: "Sofa", status: "✓" },
  {
    type: "Fondet",
    title:
      "Støtte til åreturen dfka sd fla nsdjnf alkjs dfljkaslkdjf lajk sdlj flkajs dlkjf lkjas lkj ",
    status: "✕",
  },
  { type: "Onlinepotten", title: "Arbeidskveld", status: "✓" },
  { type: "Kvitteringskjema", title: "Flyreise", status: "✓" },
  { type: "Kvitteringskjema", title: "Arbeidskveld", status: "✕" },
];

const ItemList: React.FC = () => {
  return (
    <div>
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

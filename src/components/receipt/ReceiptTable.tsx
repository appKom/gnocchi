import React, { useState } from "react";
import ReceiptRow from "../../components/receipt/ReceiptRow";
import { Receipt_Info } from "../../api/adminReceiptAPI";
import Button from "../../components/universal/Button";
import { Oval } from "react-loader-spinner";

interface ReceiptTableProps {
  receipts: Receipt_Info[] | undefined;
  receiptsLoading: boolean;
  onSetActive: () => void;
  onSetHistory: () => void;
  receiptStatus: String | undefined | null;
}

const ReceiptTable = ({
  receipts,
  receiptsLoading,
  onSetActive,
  onSetHistory,
  receiptStatus,
}: ReceiptTableProps) => {
  const selectedButton =
    receiptStatus === "NONE"
      ? "active"
      : receiptStatus === "DONE"
        ? "history"
        : "none";

  const handleSetActive = () => {
    onSetActive();
  };

  const handleSetHistory = () => {
    onSetHistory();
  };

  return (
    <div>
      {/* Buttons Section */}
      <div className="w-full flex flex-row justify-start items-center max-w-[1100px] ml-auto mr-auto pl-5 pt-5 space-x-4">
        <Button
          title="Aktive"
          color={selectedButton === "active" ? "green" : "darkGreen"}
          onClick={handleSetActive}
          className="w-[120px] rounded-t-lg rounded-b-none"
        />
        <Button
          title="Historikk"
          color={selectedButton === "history" ? "green" : "darkGreen"}
          onClick={handleSetHistory}
          className="w-[120px] rounded-t-lg rounded-b-none"
        />
      </div>

      <hr className="max-w-[1100px] ml-auto mr-auto" />

      {receiptsLoading ? (
        <div className="flex justify-center items-center h-[200px] w-[100vw]">
          <Oval height={40} />
        </div>
      ) : receipts && receipts.length > 0 ? (
        <table className="w-full border-separate border-spacing-y-3 max-w-[1100px] ml-auto mr-auto">
          <thead>
            <tr>
              <th></th>
              <th className="text-left text-white text-xl font-normal">
                Komité
              </th>
              <th className="text-left text-white text-xl font-normal">
                Anledning
              </th>
              <th className="text-left text-white text-xl font-normal hidden md:table-cell">
                Type
              </th>
              <th className="text-left text-white text-xl font-normal hidden md:table-cell">
                Kommentar
              </th>
              <th className="text-middle w-[110px] text-white text-xl font-normal">
                Dato
              </th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((receipt) => (
              <ReceiptRow key={receipt.receiptId} receipt={receipt}/>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-middle text-white text-xl font-normal pt-5">
          Ingen kvitteringer å vise
        </p>
      )}
    </div>
  );
};

export default ReceiptTable;

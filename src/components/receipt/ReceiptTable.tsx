import React from "react";
import ReceiptRow from "../../components/receipt/ReceiptRow";
import { Receipt_Info } from "../../api/adminReceiptAPI";

interface ReceiptTableProps {
  receipts: Receipt_Info[] | undefined;
}

const ReceiptTable = ({ receipts }: ReceiptTableProps) => {
  return receipts && receipts.length > 0 ? (
    <table className="w-full border-separate border-spacing-y-3 max-w-[1100px] ml-auto mr-auto">
      <thead>
        <tr>
          <th></th>
          <th className="text-left text-white text-xl font-normal">Komité</th>
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
          <ReceiptRow key={receipt.receiptId} receipt={receipt} />
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-middle text-white text-xl font-normal pt-5">
      Ingen kvitteringer å vise
    </p>
  );
};

export default ReceiptTable;

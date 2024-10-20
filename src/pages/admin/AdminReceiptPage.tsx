import React, { useState } from "react";
import Button from "../../components/universal/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllReceipts, Receipt_Info } from "../../api/adminReceiptAPI";
import { useQuery } from "@tanstack/react-query";
import ReceiptRow from "../../components/receipt/ReceiptRow";
import { fetchCommittees, Committee } from "../../api/baseAPI";
import { Dropdown } from "flowbite-react";
import { Receipt } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ReceiptTable from "../../components/receipt/ReceiptTable";

const AdminReceiptPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [receipts, setReceipts] = useState<Receipt_Info[]>([]);
  const [selectedCommittee, setSelectedCommittee] = useState<String>();
  const [receiptStatus, setReceiptStatus] = useState<String>();
  const [searchTerm, setSearchTerm] = useState<String>();

  const { data: receiptData, isError } = useQuery({
    queryKey: ["receipts_admin"],
    queryFn: () => fetchAllReceipts(getAccessTokenSilently, 0, 10),
  });

  const { data: committeeData } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchCommittees(getAccessTokenSilently),
  });

  // Filter receipts based on selected committee and receipt status

  const filteredReceipts = receiptData
    ?.filter((receipt) =>
      selectedCommittee ? receipt.committeeName === selectedCommittee : true
    )
    ?.filter((receipt) => {
      if (receiptStatus === "Active") {
        return receipt.latestReviewStatus === null; // Show null status reviews
      } else if (receiptStatus === "History") {
        return (
          receipt.latestReviewStatus === "APPROVED" ||
          receipt.latestReviewStatus === "DENIED"
        );
      }
      return true; // Show all if no status is selected
    })
    ?.filter((receipt) => {
      if (searchTerm) {
        return receipt.receiptName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else {
        return true;
      }
    });

  const handleSetStatusHistory = () => {
    setReceiptStatus("History");
  };

  const handleSetStatusActive = () => {
    setReceiptStatus("Active");
  };

  return (
    <div className="w-full flex-row p-5">
      <div className="w-full flex flex-row justify-between items-center max-w-[1100px] ml-auto mr-auto">
        <TextField
          id="search"
          label="Søk på anledning..."
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormControl>
          <InputLabel id="committeeLabel">Velg Komité</InputLabel>
          <Select
            labelId="comitteeLabel"
            id="committeeDropdown"
            value={selectedCommittee}
            label="Komité"
            onChange={(e) => setSelectedCommittee(e.target.value as string)}
            sx={{
              backgroundColor: "white",
              width: "200px",
            }}
          >
            {committeeData &&
              committeeData?.map((committee: Committee) => (
                <MenuItem
                  key={committee.id}
                  value={committee.name} // This value will be passed on change
                >
                  {committee.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      <div className="w-full flex flex-row justify-start items-center max-w-[1100px] ml-auto mr-auto pl-5 pt-5 space-x-4">
        <Button
          title="Aktive"
          color={"green"}
          onClick={handleSetStatusActive}
          className="w-[120px] rounded-t-lg rounded-b-none"
        ></Button>
        <Button
          title="Historikk"
          color={"green"}
          onClick={handleSetStatusHistory}
          className="w-[120px] rounded-t-lg rounded-b-none"
        ></Button>
      </div>
      <hr className="max-w-[1100px] ml-auto mr-auto"></hr>
      <ReceiptTable receipts={filteredReceipts} />
    </div>
  );
};

export default AdminReceiptPage;

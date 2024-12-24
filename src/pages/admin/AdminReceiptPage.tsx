import React, { useState, useEffect, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllReceipts, Receipt_Info } from "../../api/adminReceiptAPI";
import { useQuery } from "@tanstack/react-query";
import { fetchCommittees, Committee } from "../../api/baseAPI";
import {
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  TablePagination,
} from "@mui/material";
import ReceiptTable from "../../components/receipt/ReceiptTable";
import debounce from "lodash.debounce";

const AdminReceiptPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [receipts, setReceipts] = useState<Receipt_Info[]>([]);
  const [selectedCommittees, setSelectedCommittees] = useState<string[]>([]);
  const [receiptStatus, setReceiptStatus] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState<string>(); // The raw value from the input field
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(); // The debounced value

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const {
    data: receiptData,
    isLoading: receiptDataLoading,
    isError,
  } = useQuery({
    queryKey: [
      "receipts_admin",
      page,
      rowsPerPage,
      debouncedSearchTerm,
      selectedCommittees.join(","),
      receiptStatus,
    ],
    queryFn: () =>
      fetchAllReceipts(
        getAccessTokenSilently,
        page,
        rowsPerPage,
        debouncedSearchTerm,
        selectedCommittees.join(","),
        receiptStatus,
      ),
  });

  const { data: committeeData } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchCommittees(getAccessTokenSilently),
  });

  const handleSetStatusHistory = () => {
    if (receiptStatus === "DONE") {
      setReceiptStatus(undefined);
    } else {
      setReceiptStatus("DONE");
    }
  };

  const handleSetStatusActive = () => {
    if (receiptStatus === "NONE") {
      setReceiptStatus(undefined);
    } else {
      setReceiptStatus("NONE");
    }
  };

  const handleCommitteeChange = (event: any) => {
    const value = event.target.value;
    setSelectedCommittees(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="w-full flex-row p-5">
      <div className="w-full flex flex-row justify-between items-center max-w-[1100px] ml-auto mr-auto pb-5 pt-24">
        <TextField
          id="search"
          placeholder="Søk på anledning..."
          variant="outlined"
          onChange={handleSearchChange}
          value={searchTerm}
          sx={{
            backgroundColor: "white",
            width: "200px",
            height: "40px",
            borderRadius: "4px",
            "& .MuiOutlinedInput-root": {
              height: "40px",
            },
            "& .MuiInputLabel-root": {
              top: "-5px",
            },
          }}
        />
        <FormControl sx={{ width: "200px", height: "40px" }}>
          <Select
            id="committeeDropdown"
            multiple
            value={selectedCommittees || ""}
            onChange={handleCommitteeChange}
            inputProps={{ "aria-label": "Without label" }}
            input={<OutlinedInput notched={false} />}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span className="text-gray-500">Filtrer...</span>;
              }
              return selected.join(", ");
            }}
            sx={{
              backgroundColor: "white",
              height: "40px",
              textAlign: "left",
            }}
          >
            {committeeData &&
              committeeData?.map((committee: Committee) => (
                <MenuItem key={committee.id} value={committee.name}>
                  <Checkbox
                    checked={selectedCommittees.includes(committee.name)}
                  />
                  {committee.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
      {(receiptData || receiptDataLoading) && (
        <ReceiptTable
          receipts={receiptData?.receipts}
          receiptsLoading={receiptDataLoading}
          onSetActive={handleSetStatusActive}
          onSetHistory={handleSetStatusHistory}
          receiptStatus={receiptStatus}
        />
      )}
      {receiptData && receiptData.total > 0 && (
        <TablePagination
          className="flex justify-center"
          component="div"
          count={receiptData?.total || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </div>
  );
};

export default AdminReceiptPage;

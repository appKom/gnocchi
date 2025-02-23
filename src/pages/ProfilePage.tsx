import ProfileCard from "../components/profile/ProfileCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllUserReceipts } from "../api/userAPI";
import ReceiptTable from "../components/receipt/ReceiptTable";
import { Pagination } from "@mui/material";
import { useEffect } from "react";

const ProfilePage = () => {
  const auth = useAuth0();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(); // The debounced value
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [receiptStatus, setReceiptStatus] = useState<string | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const {
    data: receiptData,
    isLoading: receiptDataLoading,
  } = useQuery({
    queryKey: [
      "receipts_user",
      page - 1,
      rowsPerPage,
      receiptStatus,
      debouncedSearchTerm,
    ],
    queryFn: () => fetchAllUserReceipts(page - 1, rowsPerPage, receiptStatus),
  });

   useEffect(() => {
      setPage(1);
    }, [debouncedSearchTerm, receiptStatus]);

  return (
    <div className="flex min-h-screen pt-5">
      <div className="hidden sm:block lg:block">
        <ProfileCard />
      </div>
      <div className="ml-5 mr-5 rounded-xl flex-grow p-2 min-[400px]:p-8 bg-[#669782] h-full">
        <ReceiptTable
          receipts={receiptData?.receipts}
          receiptsLoading={receiptDataLoading}
          setReceiptStatus={setReceiptStatus}
          receiptStatus={receiptStatus}
        />
        {receiptData && receiptData.total > 0 && (
          <Pagination
            className="flex justify-center mt-5"
            count={Math.ceil(receiptData.total / rowsPerPage)}
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

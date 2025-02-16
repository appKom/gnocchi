import ProfileCard from "../components/profile/ProfileCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllUserReceipts } from "../api/userAPI";
import ReceiptTable from "../components/receipt/ReceiptTable";

const ProfilePage = () => {
    const auth = useAuth0();
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(); // The debounced value
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [receiptStatus, setReceiptStatus] = useState<string | null>(null);

  const {
    data: receiptData,
    isLoading: receiptDataLoading,
  } = useQuery({
    queryKey: [
      "receipts_user",
      page-1,
      rowsPerPage,
      receiptStatus,
      debouncedSearchTerm,
    ],
    queryFn: () =>
      fetchAllUserReceipts(
        page-1,
        rowsPerPage,
        receiptStatus
    ),
  });
  
  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:block lg:block">
        <ProfileCard />
      </div>
      <div className="ml-5 mr-5 rounded-xl flex-grow p-8 bg-[#669782] h-full">
        
        <ReceiptTable 
          receipts={receiptData?.receipts}
          receiptsLoading={receiptDataLoading}
          setReceiptStatus={setReceiptStatus}
          receiptStatus={receiptStatus}/>
      </div>
    </div>
  );
};

export default ProfilePage;

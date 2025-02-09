import ProfileCard from "../components/profile/ProfileCard";
import ItemList from "../components/profile/ItemList";
import Navbar from "../components/universal/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAllUserReceipts } from "../api/userAPI";
import ReceiptTable from "../components/receipt/ReceiptTable";

const ProfilePage = () => {
    const auth = useAuth0();
    const { loginWithRedirect } = auth;
    const [searchTerm, setSearchTerm] = useState<string>(); // The raw value from the input field
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(); // The debounced value
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [receiptStatus, setReceiptStatus] = useState<string | undefined>();

  const {
    data: receiptData,
    isLoading: receiptDataLoading,
    isError,
  } = useQuery({
    queryKey: [
      "receipts_user",
      page-1,
      rowsPerPage,
      debouncedSearchTerm,
    ],
    queryFn: () =>
      fetchAllUserReceipts(
        page-1,
        rowsPerPage,
    ),
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
  console.log("receiptData", receiptData);
  console.log("receipts", receiptData);
  return (
    <div className="flex min-h-screen">
      <div className="hidden sm:block lg:block">
        <ProfileCard />
      </div>
      <div className="ml-5 mr-5 rounded-xl flex-grow p-8 bg-[#669782] h-full">
        
        <ReceiptTable 
          receipts={receiptData}
          receiptsLoading={receiptDataLoading}
          onSetActive={handleSetStatusActive}
          onSetHistory={handleSetStatusHistory}
          receiptStatus={receiptStatus}/>
      </div>
    </div>
  );
};

export default ProfilePage;

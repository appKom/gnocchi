import React from "react";
import Item from "./Item";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUserReceipts } from "../../api/userAPI";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosCloseCircle, IoIosMail, IoMdCheckmark } from "react-icons/io";

const ItemList: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  
  const {data: receiptData, isError} = useQuery({
    queryKey: ["receipts_user"],
    queryFn: () => fetchAllUserReceipts(getAccessTokenSilently, 0, 10),
  });
  
  return (
    <div>
      {Array.isArray(receiptData) && receiptData.length > 0 &&
      receiptData.map((item, index) => (
            <Item
              key={index}
              type="Receipt"
              title={item.receiptName}
              status={
                item.latestReviewStatus === "APPROVED" ? (
                  <IoMdCheckmark color="green" className="text-3xl" />
                ) : item.latestReviewStatus === "DENIED" ? (
                  <IoIosCloseCircle color="#DD0000" className="text-3xl" />
                ) : (
                  <IoIosMail color="#0000CC" className="text-3xl" />
                )
              }
            />
          ))
      }

    </div>
  );
};

export default ItemList;

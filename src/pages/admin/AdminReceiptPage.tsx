
import React from 'react';
import Button from '../../components/universal/Button';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllReceipts, Receipt_Info } from '../../api/adminReceiptAPI';
import { useQuery } from "@tanstack/react-query";
import ReceiptRow from '../../components/receipt/ReceiptRow';

const AdminReceiptPage = () => {

    const { getAccessTokenSilently } = useAuth0();
    const [receipts, setReceipts] = React.useState<Receipt_Info[]>([]);

    
    const { data, isError } = useQuery({
        queryKey: ["receipts_admin"],
        queryFn: () => fetchAllReceipts(getAccessTokenSilently, 0, 10),
    });


    return (
        <div className='w-full flex-row p-5'>
         
            <table className='w-full border-separate border-spacing-y-3 max-w-[1100px] ml-auto mr-auto'>
                <thead>
                <tr>
                    <th></th>
                    <th className='text-left text-white text-xl font-normal'>Komité</th>
                    <th className='text-left text-white text-xl font-normal'>Annledning</th>
                    <th className='text-left text-white text-xl font-normal hidden md:table-cell'>Type</th>
                    <th className='text-left text-white text-xl font-normal hidden md:table-cell'>Kommentar</th>
                    <th className='text-middle w-[110px] text-white text-xl font-normal'>Dato</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((receipt) => (
                    <ReceiptRow key={receipt.receiptId} receipt={receipt} />
                ))}
                </tbody>
            </table>
        </div>
    );
    };

export default AdminReceiptPage;
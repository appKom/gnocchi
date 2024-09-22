export interface Receipt_Info {
    receiptId: number;
    amount: number; 
    receiptName: string;
    receiptDescription: string;
    receiptCreatedAt: string;
    committeeName: string;
    userFullname: string;
    paymentOrCard: string;
    attachmentCount: number;
    latestReviewStatus: string;
    latestReviewCreatedAt: string; 
}


export const fetchAllReceipts = async (getAccessTokenSilently: Function, from: Number, count: Number): Promise<Receipt_Info[]> => {
    const accesstoken = await getAccessTokenSilently();
  return fetch(import.meta.env.VITE_BACKEND_URI as string + '/api/admin/receipt/all?from=' + from + '&count=' + count,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + accesstoken,
      },
    }
  ).then((res) => res.json()
  );
};
interface Receipt {
  amount: number;
  committee_id: number;
  name: string;
  description: string;
  id: 0;
}

interface ReceiptRequestBody {
  receipt: Receipt;
  attachments: string[];
}

interface Application {
  field1: string;
  field2: string;
  field3: string;
  amount: number;
  attachments: string[];
  comments: string;
  id: 0;
}

export const submitReceipt = async (
  getAccessTokenSilently: Function,
  receiptbody: ReceiptRequestBody
) => {
  const accesstoken = await getAccessTokenSilently();
  return fetch(
    (import.meta.env.VITE_BACKEND_URI as string) + "/api/receipt/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + accesstoken,
      },
      body: JSON.stringify(receiptbody),
    }
  );
};

export const submitEconomicRequest = async (
  getAccessTokenSilently: Function,
  application: Application
) => {
  //   const accesstoken = await getAccessTokenSilently();
  //   return fetch(import.meta.env.VITE_BACKEND_URI as string + '/api/receipt/create',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ` + accesstoken,
  //     },
  //     body: JSON.stringify(receiptbody)
  //   }
  // )
};

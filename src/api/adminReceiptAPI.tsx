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

export interface CompleteReceipt {
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
  latestReviewComment: string;
  paymentAccountNumber: string;
  cardCardNumber: string;
  attachments: string[];
}

export interface ReceiptReview {
  receiptId: number;
  status: string;
  comment: string;
}

export interface AllReceiptsResponse {
  receipts: Receipt_Info[];
  total: number;
}

export const fetchAllReceipts = async (
  from: number,
  count: number,
  search?: string,
  committee?: string,
  status?: string,
  sortOrder?: string,
  sortField?: string,
): Promise<AllReceiptsResponse> => {
  const params = new URLSearchParams({
    from: from.toString() || "0",
    count: count.toString() || "10",
  });

  if (search) params.append("search", search);
  if (committee) params.append("committee", committee);
  if (status) params.append("status", status);
  if (sortOrder) params.append("sortOrder", sortOrder);
  if (sortField) params.append("sortField", sortField);

  const url = `${import.meta.env.VITE_BACKEND_URI}/api/admin/receipt/all?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Error fetching receipts: ${response.statusText}`);
  }

  const data: AllReceiptsResponse = await response.json();

  return data;
};

export const fetchCompleteReceipt = async (
  receiptId: Number,
): Promise<CompleteReceipt> => {
  const res = await fetch(
    (import.meta.env.VITE_BACKEND_URI as string) +
      "/api/admin/receipt/get/" +
      receiptId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (res.ok) {
    console.log("f");
    return res.json();
  } else {
    console.log("fff");
    throw new Error("Failed to fetch receipt");
  }
};

export const postReceiptReview = async (
  receiptreview: ReceiptReview,
): Promise<void> => {
  const res = await fetch(
    (import.meta.env.VITE_BACKEND_URI as string) + "/api/admin/receipt/review",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(receiptreview),
    },
  );

  if (res.status == 200) {
    console.log("AAA");
    return;
  } else {
    console.log("BBB");
    throw new Error("Failed to post receipt review");
  }
};

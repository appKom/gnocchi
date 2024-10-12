import React from 'react'
import { CalendarIcon, CreditCardIcon, UserIcon, PaperClipIcon, ClockIcon, CurrencyEuroIcon } from '@heroicons/react/24/outline'
import { fetchCompleteReceipt, postReceiptReview, ReceiptReview } from '../../api/adminReceiptAPI'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
import Spinner from '../../components/universal/Spinner'
import AdminBadge from '../../components/admin/AdminBadge';





const AdminReviewReceiptPage = () => {

  const { getAccessTokenSilently } = useAuth0();
  const receiptid = useParams<{ receiptid: string }>().receiptid;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["completereceipt", receiptid],
    queryFn: () => fetchCompleteReceipt(getAccessTokenSilently, receiptid as unknown as Number),
  });


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('no', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const [newReviewStatus, setNewReviewStatus] = React.useState("");
  const [reviewComment, setReviewComment] = React.useState("");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const receiptreview: ReceiptReview = {
      receiptId: receiptid as unknown as number,
      status: newReviewStatus,
      comment: reviewComment
    }

    try {
      await postReceiptReview(getAccessTokenSilently, receiptreview);
      alert("Review sent")
      window.location.reload();
    }
    catch (error) {
      console.error(error);
      alert("Error sending review")
    }
  }



  return (
    <div className="min-h-screen bg-[#2e6e53] text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center flex flex-col gap-4 items-center">
          <AdminBadge className='w-[80px]' />
          Kvittering</h1>
        {isError && <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg mx-auto">Det har oppstått en feil. Prøv å logg inn og ut, eller refresh siden.</div>}
        {isLoading && <div className="mt-[100px] font-bold text-xl text-white mx-auto">
          <Spinner size={4} color="green" />
          <p className="mt-[20px] text-green">Vennligst vent</p>
        </div>}
        <div className="grid gap-6 md:grid-cols-2">
          {data && (
            <>

              <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">Detaljer</h2>
                <div className="flex items-center justify-center mb-2">
                  <p className="mr-2 text-white font-semibold">Kvittering-ID:</p>
                  <p>{data.receiptId}</p>
                </div>
                <div className="flex items-center justify-center mb-2">
                  <p className="mr-2 text-white font-semibold">Beløp:</p>
                  <p className="flex items-center">
                    <CurrencyEuroIcon className="h-4 w-4 mr-1 text-white" />
                    {data.amount.toFixed(2)}
                  </p>
                </div>
                <div className='mb-2'>
                  <p className="text-white font-semibold">Anledning:</p>
                  <p>{data.receiptName}</p>
                </div>
                <div className='mb-2'>
                  <p className="text-white font-semibold">Beskrivelse:</p>
                  <p>{data.receiptDescription}</p>
                </div>
                <div className="flex items-center justify-center">
                  <p className="mr-2 text-white font-semibold">Sendt inn:</p>
                  <p className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1 text-white" />
                    {formatDate(data.receiptCreatedAt)}
                  </p>
                </div>

              </div>

              <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-sm flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-white">Bruker og komité</h2>
                <p className="mr-2 text-white font-semibold">Bruker:</p>
                <p className="flex items-center justify-center mb-2">
                  <UserIcon className="h-4 w-4 mr-1 text-white" />
                  {data.userFullname}
                </p>
                <p className="text-white font-semibold">Komité:</p>
                <p>{data.committeeName}</p>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">Betaling</h2>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <p className="text-white font-semibold">Type:</p>
                    <p>{data.paymentOrCard == "Payment" ? "Onlinekort" : "Utlegg"}</p>
                  </div>
                  {data.paymentOrCard === "Card" ? (
                    <div className="flex items-center">
                      <p className=" mr-2 text-white font-semibold">Kortnummer:</p>
                      <p className="flex items-center">
                        <CreditCardIcon className="h-4 w-4 mr-1 text-white" />
                        {data.cardCardNumber}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className=" text-white font-semibold">Kontonummer:</p>
                      <p>{data.paymentAccountNumber}</p>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4 text-white">Status</h2>
                <div className="flex items-center justify-center mb-2">
                  <p className=" mr-2 text-white font-semibold">Status:</p>
                  <p>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${data.latestReviewStatus === "Pending"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                      }`}>
                      {data.latestReviewStatus || "Not Reviewed"}
                    </span>
                  </p>
                </div>
                {data.latestReviewCreatedAt ?
                  <>
                    <div className="flex items-center justify-center">
                      <p className=" mr-2 text-white font-semibold">Sist oppdatert:</p>
                      <p className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1 text-white" />
                        {formatDate(data.latestReviewCreatedAt)}
                      </p>

                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-white font-semibold mr-2">Kommentar: </p>
                      <p>{data.latestReviewComment}</p>
                    </div>
                  </>
                  :
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-green-100">Status</label>
                      <select
                        id="status"
                        value={newReviewStatus}
                        onChange={(e) => setNewReviewStatus(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white bg-opacity-20 text-white"
                        required
                      >
                        <option value="">Velg status</option>
                        <option value="APPROVED">Godkjent</option>
                        <option value="DENIED">Ikke godkjent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment" className="block text-sm font-medium text-green-100">Kommentar</label>
                      <textarea
                        id="comment"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-400 p-3"
                        placeholder="Legg til en kommentar..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Send
                    </button>
                  </form>
                }
              </div>


              <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-sm md:col-span-2 items-center">
                <h2 className="text-xl font-semibold mb-4 text-white">Vedlegg</h2>
                <div className="flex items-center mb-2 justify-center">
                  <PaperClipIcon className="h-4 w-4 mr-1 text-white" />
                  <span className="text-sm font-medium">Antall vedlegg: {data.attachmentCount}</span>
                </div>
                {data.attachments.map((attachment, index) => (
                  <img key={index} src={`data:image/png;base64,${attachment}`} alt={`Attachment ${index + 1}`} className="max-w-full h-auto mx-auto" />
                ))}
              </div>
            </>)}
        </div>

      </div>

    </div>
  )
}

export default AdminReviewReceiptPage
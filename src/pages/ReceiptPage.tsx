import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchCommittees } from "../api/baseAPI";
import FileUpload from "../components/form/FileUpload";
import { fileToBase64 } from "../utils/fileutils";

import { submitReceipt } from "../api/formsAPI";

import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";


interface Committee {
  id: string;
  name: string;
}

interface Receipt {
  amount: number;
  committee_id: string;
  name: string;
  description: string;
  id: 0;
}

interface FormData {
  amount: number;
  committee_id: string;
  name: string;
  description: string;
  card_number?: string;
  account_number?: string;
  id: 0;
}

interface PaymentInformation {
  usedOnlineCard: boolean;
  accountnumber?: string;
  cardnumber?: string;
}
interface ReceiptRequestBody {
  receipt: Receipt;
  attachments: string[];
  receiptPaymentInformation?: PaymentInformation;
}

const ReceiptPage = () => {
  const navigate = useNavigate();

  const [usedOnlineCard, setUsedOnlineCard] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [attachments, setAttachments] = useState<File[]>([]);
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

  const auth = useAuth();
  const { user } = auth;

 
  const { data, isError } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchCommittees(),
  });

  const onFileChange = async (files: File[]) => {
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      alert("Bare PDF eller bildefiler (JPG, PNG, JPEG) er tillatt. Ugyldige filer ble ignorert.");
    }

    setAttachments(validFiles);
  };

  const [formdata, setFormdata]: [FormData, any] = useState({
    amount: 0,
    committee_id: "",
    name: "",
    description: "",
    id: 0,
    card_number: "",
    account_number: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    account_number: "",
    card_number: "",
    name: "",
    committee_id: "",
    attachments: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {
      amount: "",
      account_number: "",
      card_number: "",
      name: "",
      committee_id: "",
      attachments: "",
    };

    if (!usedOnlineCard) {
      if (!/^\d{11}$/.test(formdata.account_number || "")) {
        newErrors.account_number = "Kontonummer må være 11 sifre";
      }
    }

    if (usedOnlineCard) {
      const cardNumber = formdata.card_number || "";
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.card_number = "Kortnummer må være 16 sifre";
      }
    }

    if (formdata.name.trim() === "") {
      newErrors.name = "Vennligst skriv anledning";
    }

    if (!formdata.committee_id) {
      newErrors.committee_id = "Velg en ansvarlig enhet";
    }

    if (attachments.length === 0) {
      newErrors.attachments = "Last opp minst én kvittering/vedlegg";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  };

  const formatAccountNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const parts: string[] = [];

    if (digits.length > 0) parts.push(digits.substring(0, 4));
    if (digits.length > 4) parts.push(digits.substring(4, 6));
    if (digits.length > 6) parts.push(digits.substring(6, 11));

    return parts.join(" ");
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")       
      .replace(/(.{4})/g, "$1 ") 
      .trim();
  };

  const submitform = async () => {
    if (!validateForm()) return;

    const numericAmount = parseFloat(amountInput);
    const updatedFormData = { ...formdata, amount: numericAmount };

    setDisableSubmit(true);
    const paymentInfo: PaymentInformation = {
      usedOnlineCard: usedOnlineCard,
      accountnumber: usedOnlineCard ? "" : formdata.account_number,
      cardnumber: usedOnlineCard ? formdata.card_number : "",
    };
    const receipt: Receipt = {
      amount: formdata.amount,
      committee_id: formdata.committee_id,
      name: formdata.name,
      description: formdata.description,
      id: 0,
    };
    const body: ReceiptRequestBody = {
      receipt: updatedFormData,
      attachments: await Promise.all(
        [...attachments].map(async (file) => await fileToBase64(file)),
      ),
      receiptPaymentInformation: paymentInfo,
    };

    try {
      await submitReceipt(body);
      alert("Kvittering sendt inn!");
      // TODO: Fix with popup success message in home something
      navigate("/?receiptsubmittedsuccess=1");
    } catch (e) {
      alert("Noe gikk galt, prøv igjen senere");
    }

    setDisableSubmit(false);
  };

  return (
    <div className="min-h-screen pb-[200px]">
      <div className="max-w-2xl ml-auto mr-auto">
        <div className="flex justify-center gap-[50px] mt-[60px]">
          <h1 className="text-5xl text-white text-center self-center mb-auto mt-auto font-thin">
            Kvitteringsskjema
          </h1>
          <img
            src={"../../../resources/images/receiptpageimage.png"}
            className="w-[130px] hidden md:flex "
          ></img>
        </div>
        <div className="mt-[30px]">
          <h1 className="text-3xl text-white text-center self-center font-thin">
            Kvitteringsinformasjon
          </h1>
          <h1 className="text-xl text-white text-center self-center mt-[10px] font-thin">
            Kort brukt til kjøpet
          </h1>
        </div>
    
        <div className="flex justify-center gap-5 mt-[10px] text-white mb-[10px]">
          <div className="flex items-center gap-3">
            <input
              defaultChecked
              onClick={() => setUsedOnlineCard(false)}
              name="receiptcard"
              className="cursor-pointer appearance-none border-white border-2 rounded-xl w-4 h-4 p-[0.05rem] checked:bg-white checked:border-white checked:bg-clip-content"
              type="radio"
            ></input>

            <label className="">Eget kort</label>
          </div>
          <div className="flex items-center gap-3">
            <input
              onClick={() => setUsedOnlineCard(true)}
              name="receiptcard"
              className="cursor-pointer appearance-none border-white border-2 rounded-xl w-4 h-4 p-[0.05rem] checked:bg-white checked:border-white checked:bg-clip-content"
              type="radio"
            ></input>
            <label>Onlines bankkort</label>
          </div>
        </div>
        <div className={`${usedOnlineCard ? "hidden" : ""} text-white `}>
          <div className="flex justify-center gap-3 flex-col md:gap-10 md:flex-row items-center">
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Kontonummer</p>
              <input
                type="text"
                placeholder={"2345 XX XXXX"}
                className="text-black p-3 rounded w-full"
                value={formatAccountNumber(accountNumber)}
                maxLength={13}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setAccountNumber(raw);
                  setFormdata({ ...formdata, account_number: raw });
                }}
              ></input>
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.account_number || " "}
              </p>
            </div>
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Beløp</p>
              <input
                type="text"
                placeholder={"530"}
                className="text-black p-3 rounded w-full"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const value = raw.slice(0, 6);  // Limit to 6 characters
                  console.log(value);
                  setAmountInput(value);
                }}
                value={amountInput}
              />
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.amount || " "}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-[10px] gap-3 flex-col md:gap-10 md:flex-row items-center">
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Anledning</p>
              <input
                placeholder={"Arbeidskveld"}
                className="text-black p-3 rounded w-full"
                onChange={(e) => {
                  setFormdata({ ...formdata, name: e.target.value });
                }}
              ></input>
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.name || " "}
              </p>
            </div>
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Ansvarlig enhet</p>
              <select
                className="text-black p-3 rounded w-full"
                onChange={(e) => {
                  setFormdata({
                    ...formdata,
                    committee_id: e.target.value,
                  });
                }}
              >
                <option value="None">Ingen</option>
                {data && data.length
                  ? data.map((committee: any) => {
                      return (
                        <option key={committee.id} value={committee.id}>
                          {committee.name}
                        </option>
                      );
                    })
                  : null}
              </select>
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.committee_id || " "}
              </p>
            </div>
          </div>
        </div>
        <div className={`${!usedOnlineCard ? "hidden" : ""} text-white`}>
          <div className="flex justify-center gap-3 flex-col md:gap-10 md:flex-row items-center">
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Kortnummer</p>
              <input
                type="text"
                placeholder={"2345 XXXX XXXX XXXX"}
                className="text-black p-3 rounded w-full"
                value={formatCardNumber(cardNumber)}
                maxLength={19}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  setCardNumber(raw);
                  setFormdata({ ...formdata, card_number: raw });
                }}
              />
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.card_number || " "}
              </p>
            </div>
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Beløp</p>
              <input
                type="text"
                placeholder={"530"}
                className="text-black p-3 rounded w-full"
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, "");
                  const value = raw.slice(0, 6);  // Limit to 6 characters
                  console.log(value);
                  setAmountInput(value);
                }}
                value={amountInput}
              />
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.amount || " "}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-[10px] gap-3 flex-col md:gap-10 md:flex-row items-center">
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Anledning</p>
              <input
                placeholder={"Arbeidskveld"}
                className="text-black p-3 rounded w-full"
                onChange={(e) => {
                  setFormdata({ ...formdata, name: e.target.value });
                }}
              ></input>
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.name || " "}
              </p>
            </div>
            <div className="flex-col w-[20rem]">
              <p className="text-left tracking-wide">Ansvarlig enhet</p>

              <select
                className="text-black p-3 rounded w-full"
                onChange={(e) => {
                  setFormdata({
                    ...formdata,
                    committee_id: e.target.value,
                  });
                }}
              >
                <option value="">Ingen</option>
                {data && data.length
                  ? data.map((committee: any) => {
                      return (
                        <option key={committee.id} value={committee.id}>
                          {committee.name}
                        </option>
                      );
                    })
                  : null}
              </select>
              <p className="text-red-500 text-sm min-h-[1.25rem]">
                {errors.committee_id || " "}
              </p>
            </div>
          </div>
        </div>
        <div className="text-white mb-[10px] mt-[10px]">
          <h1 className="text-3xl text-white text-center self-center mt-[20px] font-thin mb-[10px]">
            Vedlegg/Kvitteringer
          </h1>
          <p className="mx-5">
            Last opp et tydelig bilde/scan av kvitteringen. Husk at kvitteringen
            må være gyldig for at den skal godkjennes. Er du usikker på om
            kvitteringen er gyldig?{" "}
            <a href="/faq" className="text-green-400 underline">
              Se her
            </a>
          </p>
        </div>
        <div className="flex-col mx-5">
          <p className="text-white w-full text-left text-l mb-[5px]">Vedlegg</p>
          <FileUpload 
            files={attachments}
            onFileChange={onFileChange} 
            />
          <p className="text-red-500 text-sm min-h-[1.25rem]">
            {errors.attachments || " "}
          </p>
        </div>
        <div className="flex-col mt-[20px] mx-5">
          <p className="text-white w-full text-left text-l mb-[5px]">
            Kommentarer
          </p>
          <textarea
            name=""
            id=""
            className="w-full border-2 border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center h-[120px] bg-white"
            onChange={(e) => {
              setFormdata({ ...formdata, description: e.target.value });
            }}
          ></textarea>
        </div>
        <div>
          <button
            disabled={disableSubmit}
            className="p-3 bg-white rounded mt-[30px] hover:bg-gray-200"
            onClick={submitform}
          >
            Send skjema
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
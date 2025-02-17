import { sendRequest, GET } from "./helper";

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI as string;
export interface checkUserResponse {
    success: boolean;
    isadmin: boolean;
    issuperadmin: boolean;
    expiresat: string;
    fullname: string;
}

export const setCookie = async (token: string) => {
    return sendRequest<void, void>("/auth/setuser", GET, undefined, new Map([["Authorization", `Bearer ${token}`]]));
};

export const checkCookie = async () => {
    return sendRequest<void, checkUserResponse>("/auth/getuser", GET);
};

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI as string;
export interface checkUserResponse {
    success: boolean;
    isadmin: boolean;
    issuperadmin: boolean;
    expiresat: string;
    fullname: string;
}

export const setCookie = async (token: string) => {
    const res: Response = await fetch(`${BACKEND_URI}/api/auth/setuser`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Failed to set cookie");
    }

    return res.status;
}


export const checkCookie = async () => {
    const res: Response = await fetch(`${BACKEND_URI}/api/auth/getuser`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });


    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    const data: checkUserResponse = await res.json();
    if (!data.success) {
        throw new Error("Failed to fetch user");
    }
    return data;
}

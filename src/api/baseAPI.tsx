export interface Committee {
  id: number;
  name: string;
}

export interface UserCommittees {
  email: string;
  name: string;
  committees: string[];
}

export const fetchCommittees = async () => {
  return fetch(
    (import.meta.env.VITE_BACKEND_URI as string) + "/api/committee/all",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  ).then((res) => res.json());
};

export const fetchUserComittees = async (getAccessTokenSilently: Function): Promise<UserCommittees> => {
  return await fetch(
    (import.meta.env.VITE_BACKEND_URI as string) + "/api/committee/user",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => res.json());
};

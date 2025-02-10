export interface Committee {
  id: number;
  name: string;
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

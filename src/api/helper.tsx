export const POST = 'POST';
export const GET = 'GET';

export const sendRequest = async <BODY, RESULT>(url: string, method: string, body?: BODY, headers?: Map<String, String>): Promise<RESULT> => {
    try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api${url}`,
        {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            ...(headers ? Object.fromEntries(headers) : {})
          },
          credentials: 'include',
          body: body ? JSON.stringify(body) : null
        }
      )
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Failed to fetch');
    }
    } catch (e) {
        console.error(e);
        throw new Error('Failed to fetch');
    }
}
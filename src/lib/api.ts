export default async function apiFetch<TResponse, TBody = undefined>(url: string, config?: RequestInit, body?: TBody): Promise<TResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  let options: RequestInit = {
    method: "GET",
    ...config,
  };

  if (body) {
    options = {
      ...options,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    };
  }

  const response = await fetch(baseUrl + url, options);

  if (!response.ok) {
    throw new Error("Network response failed. Status: " + response.status);
  }

  return await response.json();
}

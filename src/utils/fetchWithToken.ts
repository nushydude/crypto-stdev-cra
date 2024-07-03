interface FetchWithTokenParams {
  url: RequestInfo | URL;
  options?: RequestInit;
  accessToken: string | null;
  refreshAccessToken: () => Promise<string>;
  setAccessToken?: (accessToken: string | null) => void;
}

export const fetchWithToken = async ({
  url,
  options = {},
  accessToken,
  refreshAccessToken,
  setAccessToken,
}: FetchWithTokenParams) => {
  const getHeaders = (accessToken?: string | null) => {
    return {
      ...options.headers,
      // Add the Authorization header to the request
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };
  };

  let response = await fetch(url, {
    ...options,
    headers: getHeaders(accessToken),
  });

  if (response.status === 401) {
    // If the response is 401 Unauthorized, refresh the access token and try again.
    const newAccessToken = await refreshAccessToken();

    if (setAccessToken) {
      setAccessToken(newAccessToken);
    }

    response = await fetch(url, {
      ...options,
      headers: getHeaders(newAccessToken),
    });
  }

  return response;
};

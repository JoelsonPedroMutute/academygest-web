export const useApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase as string;

  console.log("useApi baseURL:", baseURL);

  const getHeaders = (): Record<string, string> => {
    const token = useCookie("token").value;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("getHeaders:", headers);
    return headers;
  };

 const handleError = (err: any) => {
  console.error("useApi error:", err);

  // $fetch do Nuxt: erro vem em err.data (já é o body parseado)
  const statusCode = err?.status || err?.statusCode || 500;
  const data = err?.data ?? {};

  throw { statusCode, data, message: data?.message || err?.message };
};
  const get = async <T>(path: string): Promise<T> => {
    try {
      console.log("GET request:", `${baseURL}${path}`);
      const res = await $fetch<T>(`${baseURL}${path}`, {
        method: "GET",
        headers: getHeaders(),
      });
      console.log("GET response:", res);
      return res;
    } catch (err: any) {
      handleError(err);
    }
  };

  const post = async <T>(path: string, body: object): Promise<T> => {
    try {
      console.log("POST request:", `${baseURL}${path}`);
      console.log("POST body:", body);
      const res = await $fetch<T>(`${baseURL}${path}`, {
        method: "POST",
        headers: getHeaders(),
        body,
      });
      console.log("POST response:", res);
      return res;
    } catch (err: any) {
      handleError(err);
    }
  };

  const put = async <T>(path: string, body: object): Promise<T> => {
    try {
      console.log("PUT request:", `${baseURL}${path}`);
      console.log("PUT body:", body);
      const res = await $fetch<T>(`${baseURL}${path}`, {
        method: "PUT",
        headers: getHeaders(),
        body,
      });
      console.log("PUT response:", res);
      return res;
    } catch (err: any) {
      handleError(err);
    }
  };

  const patch = async <T>(path: string, body: object): Promise<T> => {
    try {
      console.log("PATCH request:", `${baseURL}${path}`);
      console.log("PATCH body:", body);
      const res = await $fetch<T>(`${baseURL}${path}`, {
        method: "PATCH",
        headers: getHeaders(),
        body,
      });
      console.log("PATCH response:", res);
      return res;
    } catch (err: any) {
      handleError(err);
    }
  };

  const del = async <T>(path: string): Promise<T> => {
    try {
      console.log("DELETE request:", `${baseURL}${path}`);
      const res = await $fetch<T>(`${baseURL}${path}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      console.log("DELETE response:", res);
      return res;
    } catch (err: any) {
      handleError(err);
    }
  };

  return { get, post, put, patch, del };
};

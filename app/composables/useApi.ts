export const useApi = () => {
  // ✅ useRuntimeConfig DEVE estar dentro da função, não no topo do módulo
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase as string;

  const getHeaders = (): Record<string, string> => {
    const token = useCookie("token").value;
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const get = async <T>(path: string): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: "GET",
      headers: getHeaders(),
    });
  };

  // ✅ Corrigido: body tipado como object para $fetch aceitar
  const post = async <T>(path: string, body: object): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: "POST",
      headers: getHeaders(),
      body,
    });
  };

  const patch = async <T>(path: string, body: object): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: "PATCH",
      headers: getHeaders(),
      body,
    });
  };

  const del = async <T>(path: string): Promise<T> => {
    return await $fetch<T>(`${baseURL}${path}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
  };

  return { get, post, patch, del };
};

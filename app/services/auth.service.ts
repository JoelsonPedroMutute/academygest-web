export const AuthService = {
  login(data: { email: string; password: string }) {
    const api = useApi();
    return api.post("/auth/login", data);
  },

  me() {
    const api = useApi();
    return api.get("/auth/me");
  },

  logout() {
    const api = useApi();
    return api.post("/auth/logout", {});
  },
};

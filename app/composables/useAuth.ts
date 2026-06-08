import { useAuthStore } from "~/stores/auth";

export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();

  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });

  const fetchUser = async () => {
    try {
      const data = await useApi().get<any>("/auth/me");
      const userData = data.user || data;
      store.setUser(userData);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      store.clear();
    }
  };

  const login = async (email: string, password: string) => {
    return await store.login(email, password);
  };

  const logout = async () => {
    try {
      await useApi().post("/auth/logout", {});
    } catch (e) {
      console.log("Logout error", e);
    } finally {
      token.value = null;
      store.clear();
      await router.push("/login");
    }
  };

  const redirectByRole = (role: string): string => {
    if (role === "admin") return "/dashboard/admin";
    if (role === "docente") return "/dashboard/docente";
    return "/dashboard/aluno";
  };

  return {
    login,
    logout,
    fetchUser,
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    role: computed(() => store.user?.role ?? null),
    isLoading: computed(() => store.isLoading),
    loginError: computed(() => store.loginError),
  };
};

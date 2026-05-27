import { useAuthStore } from "~/stores/auth";

export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();

  // ✅ Cookie com 7 dias de validade
  const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });

  const login = async (email: string, password: string) => {
    const data = await useApi().post<{ token: string; user: any }>("/login", {
      email,
      password,
    });
    token.value = data.token;
    store.setUser(data.user);
    store.setToken(data.token);
    await router.push(redirectByRole(data.user.role));
  };

  const logout = async () => {
    try {
      await useApi().post("/logout", {});
    } finally {
      token.value = null;
      store.clear();
      await router.push("/login");
    }
  };

  const redirectByRole = (role: string): string => {
    if (role === "admin") return "/admin/dashboard";
    if (role === "docente") return "/docente/dashboard";
    return "/aluno/dashboard";
  };

  return {
    login,
    logout,
    user: computed(() => store.user),
    isAuthenticated: computed(() => store.isAuthenticated),
    role: computed(() => store.user?.role ?? null),
  };
};

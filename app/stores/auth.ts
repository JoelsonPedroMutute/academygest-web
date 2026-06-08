import { defineStore } from "pinia";
import { useToast } from "~/composables/useToast";

export interface AuthUser {
  id: number;
  name?: string;
  nome?: string;
  email: string;
  role: "admin" | "docente" | "aluno";
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  loginError: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isLoading: false,
    loginError: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },

  actions: {
    setUser(userData: any) {
      this.user = {
        id: userData.id,
        name: userData.name || userData.nome,
        nome: userData.nome || userData.name,
        email: userData.email,
        role: userData.role,
      };
    },
    setToken(token: string) {
      this.token = token;
    },
    clear() {
      this.user = null;
      this.token = null;
      this.loginError = null;
    },
    async login(email: string, password: string) {
      const { error, success } = useToast();
      this.isLoading = true;
      this.loginError = null;
      
      try {
        const api = useApi();
        const response = await api.post("/api/auth/login", {
          email,
          password,
        });

        console.log("Login response:", response);
        
        const data = response.data || response;
        const token = data.token || data.access_token;
        const userData = data.user || data;

        this.setToken(token);
        this.setUser(userData);
        
        const tokenCookie = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
        tokenCookie.value = token;
        
        success("Login realizado com sucesso!");
        
        const router = useRouter();
        if (userData.role === 'admin') {
          await router.push('/dashboard/admin');
        } else if (userData.role === 'docente') {
          await router.push('/dashboard/docente');
        } else {
          await router.push('/dashboard/aluno');
        }
        
      } catch (err: any) {
        console.log("Login error:", err);
        
        this.isLoading = false;
        this.loginError = err?.data?.message || err?.message || "Credenciais inválidas";
        error(this.loginError);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

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
        const response = await api.post("/auth/login", {
          email,
          password,
        });

        console.log("Login response:", response);
        
        const data = response.data || response;
        const token = data.token || data.access_token;
        const userData = data.user || data;

        this.setToken(token);
        this.setUser(userData);
        
        const tokenCookie = useCookie("token");
        tokenCookie.value = token;
        
        success("Login realizado com sucesso!");
        
        if (userData.role === 'admin') {
          navigateTo('/dashboard/admin');
        } else if (userData.role === 'docente') {
          navigateTo('/dashboard/docente');
        } else {
          navigateTo('/dashboard/aluno');
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

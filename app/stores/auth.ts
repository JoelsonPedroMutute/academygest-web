import { defineStore } from "pinia";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "docente" | "aluno";
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.token,
  },

  actions: {
    setUser(user: AuthUser) {
      this.user = user;
    },
    setToken(token: string) {
      this.token = token;
    },
    clear() {
      this.user = null;
      this.token = null;
    },
  },
});

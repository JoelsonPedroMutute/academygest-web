import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    sidebarOpen: true,
    loading: false,
    darkMode: false,
  }),

  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },

    setLoading(value: boolean) {
      this.loading = value;
    },

    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
  },
});

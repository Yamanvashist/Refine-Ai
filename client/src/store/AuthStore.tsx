import { create } from "zustand";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_USER_API;
axios.defaults.withCredentials = true;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  credits: number;
}

interface AuthResponse {
  message: string;
  success: boolean;
  user: User;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

interface LoginForm {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  register: (formData: RegisterForm) => Promise<void>;
  login: (formData: LoginForm) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;

  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  register: async (formData) => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.post<AuthResponse>("/register", formData);

      set({
        user: data.user,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  login: async (formData) => {
    set({ loading: true, error: null });

    try {
      await axios.post("/login", formData);

      const { data } = await axios.get<AuthResponse>("/checkAuth");

      set({
        user: data.user,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });

    try {
      await axios.post("/logout");

      set({
        user: null,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Logout failed",
        loading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ loading: true, error: null });

    try {
      const { data } = await axios.get<AuthResponse>("/checkAuth");

      set({
        user: data.user,
        loading: false,
        error: null,
      });
    } catch {
      set({
        user: null,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;

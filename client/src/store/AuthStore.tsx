import { create } from "zustand";
import { api } from "../api/api";

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
      const { data } = await api.post<AuthResponse>(
        "/user/register",
        formData
      );

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
      await api.post("/user/login", formData);

      const { data } = await api.get<AuthResponse>("/user/checkAuth");

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
      await api.post("/user/logout");

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
      const { data } = await api.get<AuthResponse>("/user/checkAuth");

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
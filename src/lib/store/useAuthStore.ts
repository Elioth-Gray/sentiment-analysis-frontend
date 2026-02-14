import type { User } from '@/types/auth.type';
import { create } from 'zustand';

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: AuthState['user']) => void;

  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  setAuth: (token, user) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null }),
}));

import { create } from 'zustand';

interface AuthState {
  user: string;
  updateUserName: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: '',
  updateUserName: () => {
    set((state) => ({ user: state.user }));
  },
}));

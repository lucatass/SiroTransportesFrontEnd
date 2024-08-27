import { create } from 'zustand';

interface AuthState {
  token: string;
  sign: string;
  expiration: string; 
  setAuthData: (token: string, sign: string, expiration: string) => void;
  clearAuthData: () => void;
  isTokenExpired: () => boolean;
  getToken: () => string | null;  
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: '',
  sign: '',
  expiration: '',
  setAuthData: (token, sign, expiration) => {
    set({ token, sign, expiration });
  },
  clearAuthData: () => {
    set({ token: '', sign: '', expiration: '' });
  },
  isTokenExpired: () => {
    const expirationDate = new Date(get().expiration);
    return new Date() > expirationDate;
  },
  getToken: () => {
    if (get().isTokenExpired()) {

      return null;
    }
    return get().token;
  }
}));

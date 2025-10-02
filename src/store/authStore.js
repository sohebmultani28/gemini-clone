import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  phoneNumber: '',
  countryCode: '+91',
  
  login: (phoneNumber, countryCode) => {
    const userData = { phoneNumber, countryCode };
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth', JSON.stringify(userData));
    }
    set({ 
      user: userData,
      isAuthenticated: true,
      phoneNumber,
      countryCode
    });
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
    set({ 
      user: null,
      isAuthenticated: false,
      phoneNumber: '',
      countryCode: '+91'
    });
  },
  
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setCountryCode: (countryCode) => set({ countryCode }),
}));

export default useAuthStore;
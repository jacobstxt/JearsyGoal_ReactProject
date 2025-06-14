import {create} from "zustand";
import {useCartStore} from "./CartStore";

export const useAuthStore = create((set) => ({
    user: null,
    setUser: async (user) => {
        set({user, isAuthenticated: !!user})
        //об'єднуємо кошик
        await useCartStore.getState().mergeLocalCartToServer();
    },
    logout: async () => {
        localStorage.removeItem("jwt");
        set({ user: null,IsAuthenticated: false });
        await useCartStore.getState().clearCart();
    },
}));
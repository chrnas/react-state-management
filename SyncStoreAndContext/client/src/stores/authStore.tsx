import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

class AuthStore {
    private isAuthenticated: boolean = false;
    private listeners = new Set<() => void>();

    getState = () => {
        return this.isAuthenticated;
    }

    setAuthenticated = (authenticated: boolean) => {
        this.isAuthenticated = authenticated;
        this.listeners.forEach(listener => listener());
    }

    subscribe = (listener: () => void) => {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    };
}

// Create a single instance
const authStore = new AuthStore();

// Simple context
const AuthStoreContext = createContext<AuthStore | null>(null);

// Provider component
export function AuthStoreProvider({ children }: { children: ReactNode }) {
    return (
        <AuthStoreContext.Provider value={authStore}>
            {children}
        </AuthStoreContext.Provider>
    );
}

// Hook to use the store
export function useAuthStore() {
    const store = useContext(AuthStoreContext);
    if (!store) throw new Error("AuthStoreProvider missing");

    const isAuthenticated = useSyncExternalStore(
        store.subscribe,
        () => store.getState(),
        () => store.getState()
    );

    return {
        isAuthenticated,
        setAuthenticated: store.setAuthenticated,
    };
}
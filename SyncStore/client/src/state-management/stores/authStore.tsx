
class AuthStore {
    private isAuthenticated: boolean = false;
    private listeners = new Set<() => void>();

    getSnapshot = () => {
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
export const authStore = new AuthStore();

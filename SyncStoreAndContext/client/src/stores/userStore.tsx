import {
  createContext,
  useContext,
  type ReactNode,
  useSyncExternalStore,
} from "react";
import { type User } from "../models/userModel";

class UserStore {
  private user: User | null = null;
  private listeners = new Set<() => void>();

  getState = () => {
    return this.user;
  }

  setUser = (user: User | null) => {
    this.user = user;
    this.listeners.forEach(listener => listener());
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

// Create a single instance
const userStore = new UserStore();

// Simple context
const UserStoreContext = createContext<UserStore | null>(null);

// Provider component
export function UserStoreProvider({ children }: { children: ReactNode }) {
  return (
    <UserStoreContext.Provider value={userStore}>
      {children}
    </UserStoreContext.Provider>
  );
}

// Hook to use the store
export function useUserStore() {
  const store = useContext(UserStoreContext);
  if (!store) throw new Error("StoreProvider missing");
  
  const user = useSyncExternalStore(
    store.subscribe,
    () => store.getState(),
    () => store.getState()
  );
  
  return {
    user,
    setUser: store.setUser,
  };
}
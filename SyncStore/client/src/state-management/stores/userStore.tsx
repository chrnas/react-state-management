import { type User } from "../../models/userModel";

class UserStore {
  private user: User | null = null;
  private listeners = new Set<() => void>();

  getSnapshot = () => {
    return this.user;
  }

  setUser = (user: User | null) => {
    this.user = user;
    this.listeners.forEach(listener => listener()); // Notify all subscribers about the change
  }

  clearUser = () => {
    this.user = null;
    this.listeners.forEach(listener => listener()); // Notify listeners that the user has been cleared
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
}

// Create a single instance
export const userStore = new UserStore();
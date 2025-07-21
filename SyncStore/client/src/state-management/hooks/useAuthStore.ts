import { useSyncExternalStore } from 'react';
import { authStore } from '../stores/authStore';

export function useAuthStore(): [boolean, (authenticated: boolean) => void] {
  const auth = useSyncExternalStore(authStore.subscribe, authStore.getSnapshot);
  return [auth, authStore.setAuthenticated];
}
import { useSyncExternalStore } from 'react';
import { userStore } from '../stores/userStore';
import type { User } from '../../models/userModel';

export function useUserStore(): [User | null, (user: User | null) => void, () => void] {
  const user = useSyncExternalStore(userStore.subscribe, userStore.getSnapshot);
  return [user, userStore.setUser, userStore.clearUser];
}
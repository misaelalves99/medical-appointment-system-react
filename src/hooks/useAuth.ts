// src/hooks/useAuth.ts

import { useAuthContext } from '../contexts/AuthContext';
import type { AuthContextValue } from '../contexts/AuthContext';

export function useAuth(): AuthContextValue {
  return useAuthContext();
}

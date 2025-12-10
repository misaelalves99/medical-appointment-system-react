// src/contexts/AuthContext.tsx

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';

import { firebaseAuth } from '../app/config/firebaseConfig';
import { mapAuthError } from '../app/config/authErrorMap';

import type {
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from '../domain/Auth';

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  register: (data: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(user: FirebaseUser | null): AuthUser | null {
  if (!user) return null;

  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listener de auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      setUser(mapFirebaseUser(firebaseUser));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async ({ email, password }: LoginCredentials) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      setUser(mapFirebaseUser(result.user));
    } catch (err: any) {
      const friendlyMessage = mapAuthError(err);
      setError(friendlyMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async ({ displayName, email, password }: RegisterCredentials) => {
      setLoading(true);
      setError(null);

      try {
        const result = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password,
        );

        if (result.user) {
          // Atualiza o displayName no perfil do Firebase
          if (displayName?.trim()) {
            await updateProfile(result.user, {
              displayName: displayName.trim(),
            });
          }

          // Reaplica o mapeamento após possível updateProfile
          setUser(mapFirebaseUser(result.user));
        }
      } catch (err: any) {
        const friendlyMessage = mapAuthError(err);
        setError(friendlyMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loginWithProvider = useCallback(
    async (provider: 'google' | 'facebook') => {
      setLoading(true);
      setError(null);

      try {
        const authProvider =
          provider === 'google'
            ? new GoogleAuthProvider()
            : new FacebookAuthProvider();

        const result = await signInWithPopup(firebaseAuth, authProvider);
        setUser(mapFirebaseUser(result.user));
      } catch (err: any) {
        const friendlyMessage = mapAuthError(err);
        setError(friendlyMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loginWithGoogle = useCallback(
    () => loginWithProvider('google'),
    [loginWithProvider],
  );

  const loginWithFacebook = useCallback(
    () => loginWithProvider('facebook'),
    [loginWithProvider],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await signOut(firebaseAuth);
      setUser(null);
    } catch (err: any) {
      const friendlyMessage = mapAuthError(err);
      setError(friendlyMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    error,
    login,
    loginWithGoogle,
    loginWithFacebook,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return ctx;
}

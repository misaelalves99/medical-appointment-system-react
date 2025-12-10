// src/domain/Auth.ts

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// ✅ Agora o campo se chama displayName (compatível com o RegisterPage)
export interface RegisterCredentials {
  displayName: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

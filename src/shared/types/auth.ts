export interface User {
  id: string;
  email: string;
  username?: string;
  avatar?: string | null;
  created_at?: string;
}

export interface Session {
  user: User | null;
  access_token?: string;
  expires_at?: number;
}

export interface AuthState {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

export interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
}

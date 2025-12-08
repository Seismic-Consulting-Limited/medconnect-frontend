export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role?: string;
  hospitalId?: string;
}

export interface ResetPasswordConfirmation {
  uid: string;
  token: string;
  password: string;
}


export interface AuthResponse {
  user?: User;
  token?: string;
  refreshToken?: string;
  success?: boolean;
  error?: string;
  data?: any;
  next?: string; // e.g. "verify" when backend says user is unverified
  [key: string]: any;
}


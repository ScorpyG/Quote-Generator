import { JwtPayload } from 'jsonwebtoken';

// Custom types for auth API response
export interface AuthResponse {
  status: boolean; // Boolean for toast to determine the color
  message: string;
  user?: AuthUser | null;
}

export interface AuthUser extends JwtPayload {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImgUrl: string;
}

export interface TLogin {
  email: string;
  password: string;
}

export interface TRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

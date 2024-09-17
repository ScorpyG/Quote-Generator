import { ProfileFormInput } from '@/components/Forms/ProfileForm/useProfileForm';
import { AuthResponse, MinUserData, TLogin, TRegister } from '@/types/auth';
import { decodeCookie } from '@/utils/userCookie';
import axios from 'axios';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';

export interface TAuthContext {
  user: MinUserData | null;
  isAuthenticated: boolean;

  // Auth functions
  signIn: (data: TLogin) => Promise<AuthResponse>;
  register: (data: TRegister) => Promise<AuthResponse>;
  signOut: () => Promise<AuthResponse>;
  updateProfile: (data: ProfileFormInput) => Promise<AuthResponse>;
}

const defaultResponse: AuthResponse = {
  status: false,
  message: 'Service Unavailable',
};

export const AuthContext = createContext<TAuthContext>({
  user: null,
  isAuthenticated: false,

  signIn: async () => defaultResponse,
  register: async () => defaultResponse,
  signOut: async () => defaultResponse,
  updateProfile: async () => defaultResponse,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<MinUserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  // ! useEffect is bad
  useEffect(() => {
    const checkUser = async () => {
      if (hasCookie('user')) {
        const userCookie = getCookie('user') as string; // Casting here because CookieValueTypes = string | undefined
        const userData = await decodeCookie(userCookie);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    if (!user || !isAuthenticated) {
      checkUser();
    }
  }, [isAuthenticated, user]);

  const register = async (data: TRegister): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/register', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      status: response.data.success,
      message: response.data.message,
    };
  };

  const signIn = async (data: TLogin): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/signin', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const userCookie = getCookie('user') as string;
      const userData = await decodeCookie(userCookie);

      setUser(userData);
      setIsAuthenticated(true);

      return {
        status: response.data.success,
        message: response.data.message,
      };
    } else {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    }
  };

  const signOut = async (): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/signout', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      deleteCookie('user');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/signin');

      return {
        status: response.data.success,
        message: response.data.message,
      };
    } else {
      return {
        status: response.data.success,
        message: response.data.message,
      };
    }
  };

  const updateProfile = async (data: ProfileFormInput) => {
    const response = await axios.put('/api/auth/update', data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      setUser(response.data.data);
    }

    return {
      status: response.data.success,
      message: response.data.message,
    };
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, register, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

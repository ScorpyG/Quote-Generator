import { MinUserData } from '@/types/auth';
import jwt from 'jsonwebtoken';

export async function decodeCookie(value: string) {
  console.log(value);

  const userData = (await jwt.decode(value, {
    json: true,
  })) as MinUserData;

  return userData;
}

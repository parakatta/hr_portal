import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

export interface JwtPayload {
  userId: string;
  isProfileSetup: boolean;
}

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, secret, { expiresIn: '2h' });
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

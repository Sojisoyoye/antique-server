import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const checkSignIn = async req => {
    const token = req.headers['x-token'];
    if (token) {
      try {
        return await jwt.verify(token, process.env.SECRET);
      } catch (e) {
        throw new AuthenticationError(
          'Your session expired. Sign in again.',
        );
      }
    }
  };
// utils/jwtservice.ts

import jwt from 'jsonwebtoken';

export class JwtService {
  private secretKey: string;

  constructor() {
    // Load secret key from environment variables for better security
    this.secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';
  }

  /**
   * Generate a JWT token with a customizable payload.
   * @param payload - Data to include in the token, e.g., { orgKey, email }.
   * @param expiresIn - Expiration time for the token (default is '1h').
   * @returns A signed JWT token.
   */
  generate(payload: object, expiresIn: string = '1h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  /**
   * Verify the provided JWT token and decode its payload.
   * @param token - The JWT token to verify.
   * @returns Decoded payload if token is valid.
   * @throws Error if the token is invalid or expired.
   */
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey); // Verify and decode the token
    } catch (error) {
      throw new Error('Invalid or expired token.');
    }
  }
}

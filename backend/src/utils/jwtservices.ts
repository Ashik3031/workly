import jwt from 'jsonwebtoken';

export class JwtService {
  private secretKey: string;

  constructor() {
    // Load secret key from environment variables for better security
    this.secretKey = process.env.JWT_SECRET_KEY || 'yourSecretKey';
  }

  // Generate a token using orgKey
  generateToken(orgKey: string, expiresIn: string = '1h'): string {
    const payload = { orgKey }; // Use orgKey in payload
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  // Verify the provided token
  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.secretKey); // Verify token validity
    } catch (error) {
      throw new Error('Invalid or expired token.');
    }
  }
}

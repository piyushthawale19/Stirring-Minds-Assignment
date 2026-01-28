import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log('[Auth Middleware] Received token:', token?.substring(0, 20) + '...');

            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            console.log('[Auth Middleware] Decoded ID:', decoded.id);

            req.user = await User.findById(decoded.id).select('-passwordHash');

            if (!req.user) {
                console.log('[Auth Middleware] User NOT found in DB for ID:', decoded.id);
                return res.status(401).json({ success: false, error: 'User not found' });
            }

            console.log('[Auth Middleware] User found:', req.user.email);
            return next();
        } catch (error) {
            console.error('[Auth Middleware] Token verification failed:', error);
            return res.status(401).json({ success: false, error: 'Not authorized, token failed' });
        }
    }

    // No token provided
    return res.status(401).json({ success: false, error: 'Not authorized, no token' });
};

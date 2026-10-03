import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express';
import { config } from './config.js';
import { fail } from './types.js';
export const hashPassword = (value: string) => bcrypt.hash(value, 12);
export const comparePassword = (value: string, hash: string) => bcrypt.compare(value, hash);
export const signToken = (user: { id: string; role: string; email: string }) => jwt.sign(user, config.jwtSecret, { expiresIn: '7d' });
export const requireAuth: RequestHandler = (req, res, next) => {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json(fail('UNAUTHORIZED', 'A bearer token is required.'));
  try { req.user = jwt.verify(token, config.jwtSecret) as Express.Request['user']; next(); }
  catch { return res.status(401).json(fail('UNAUTHORIZED', 'The bearer token is invalid or expired.')); }
};
export const requireRole = (...roles: string[]): RequestHandler => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return res.status(403).json(fail('FORBIDDEN', 'You do not have permission to perform this action.'));
  next();
};

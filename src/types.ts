import type { RequestHandler } from 'express';
import type { Role } from '@prisma/client';
export type AuthUser = { id: string; role: Role; email: string };
declare global { namespace Express { interface Request { user?: AuthUser } } }
export type ApiError = { error: { code: string; message: string; fields?: Record<string, string[]> } };
export const fail = (code: string, message: string, fields?: Record<string, string[]>): ApiError => ({ error: { code, message, ...(fields ? { fields } : {}) } });
export const asyncRoute = (fn: RequestHandler): RequestHandler => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

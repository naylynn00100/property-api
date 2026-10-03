import { z } from 'zod';
const nullableInt = z.number().int().nonnegative().nullable().optional();
export const listingInput = z.object({
  title: z.string().trim().min(5).max(160), description: z.string().trim().min(20).max(10000),
  transactionType: z.enum(['sale', 'rent']), propertyType: z.enum(['apartment_condo', 'house', 'land', 'commercial', 'room']), city: z.enum(['Yangon', 'Mandalay']),
  township: z.string().trim().min(2).max(100), address: z.string().trim().min(5).max(300), priceMmk: z.number().int().positive(),
  rentalBillingPeriod: z.enum(['monthly', 'weekly', 'yearly', 'other']).nullable().optional(), bedrooms: nullableInt, bathrooms: nullableInt,
  floorArea: nullableInt, landArea: nullableInt, furnishing: z.string().trim().max(100).nullable().optional(), amenityIds: z.array(z.string()).max(30).optional(),
  contactName: z.string().trim().min(2).max(100), contactPhone: z.string().trim().min(5).max(30)
}).superRefine((data, ctx) => { if (data.transactionType === 'rent' && !data.rentalBillingPeriod) ctx.addIssue({ code: 'custom', path: ['rentalBillingPeriod'], message: 'Rental listings require a billing period.' }); });
export const statusInput = z.object({ status: z.enum(['draft', 'pending_review', 'published', 'paused', 'sold_rented', 'rejected', 'hidden', 'removed']) });
export const registerInput = z.object({ name: z.string().trim().min(2).max(100), email: z.string().email().max(255).transform(v => v.toLowerCase()), password: z.string().min(8).max(128), phone: z.string().trim().min(5).max(30).optional() });
export const loginInput = z.object({ email: z.string().email().transform(v => v.toLowerCase()), password: z.string().min(1) });

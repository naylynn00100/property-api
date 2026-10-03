import type { Listing, ListingImage, User } from '@prisma/client';
export const userDto = (user: Pick<User, 'id'|'name'|'email'|'phone'|'role'|'createdAt'|'updatedAt'>) => user;
export const listingDto = (listing: Listing & { images?: ListingImage[]; owner?: Pick<User, 'id'|'name'|'phone'>; amenities?: { amenity: { id: string; name: string } }[] }) => ({
  ...listing, images: listing.images ?? [], amenities: listing.amenities?.map(x => x.amenity) ?? [], contact: listing.owner ? { name: listing.owner.name, phone: listing.owner.phone } : undefined
});

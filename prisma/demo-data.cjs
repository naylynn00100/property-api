const Database = require('better-sqlite3');
const fs = require('node:fs');
const db = new Database('dev.db');
db.pragma('foreign_keys = ON');
db.exec(fs.readFileSync('prisma/migrations/20261003000000_initial/migration.sql', 'utf8'));
const now = new Date().toISOString();
const id = (prefix) => `${prefix}_${Math.random().toString(36).slice(2, 11)}`;
const admin = id('user');
const owner = id('user');
const passwordHash = '$2b$12$LQv3c1yqBW5A1cHkWq8xUO7S9Qm0x9XgN7fYg1G1u8DqXh6J3pB5K';
const addUser = db.prepare('INSERT INTO User (id,name,email,passwordHash,phone,role,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?)');
addUser.run(admin, 'Portal Admin', 'admin@property.local', passwordHash, '+959000000000', 'ADMIN', now, now);
addUser.run(owner, 'Demo Property Owner', 'owner@property.local', passwordHash, '+959111111111', 'USER', now, now);
const add = db.prepare('INSERT INTO Listing (id,ownerId,title,description,transactionType,propertyType,city,township,address,priceMmk,rentalBillingPeriod,bedrooms,bathrooms,floorArea,landArea,furnishing,contactName,contactPhone,status,publishedAt,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
const image = db.prepare('INSERT INTO ListingImage (id,listingId,url,altText,sortOrder,createdAt) VALUES (?,?,?,?,?,?)');
const listings = [
  ['Bright condo near Inya Lake','A spacious, well maintained two bedroom condo with excellent natural light and convenient access to nearby amenities.','rent','apartment_condo','Yangon','Bahan','Bahan Township, Yangon',1800000,'monthly',2,2,93,null,'Fully furnished','Demo Property Owner','+959111111111','https://images.unsplash.com/photo-1600585154340-be6161a56a0c','Bright modern condominium'],
  ['Modern family home in Chanmyathazi','Comfortable family home with a private garden, parking, and easy access to schools and shops.','sale','house','Mandalay','Chanmyathazi','Chanmyathazi Township, Mandalay',285000000,null,4,3,210,260,'Partly furnished','Demo Property Owner','+959111111111','https://images.unsplash.com/photo-1605146769289-440113cc3d00','Modern family home'],
  ['Quiet room near Hledan','Clean and secure furnished room for a working professional, close to transport and daily conveniences.','rent','room','Yangon','Kamayut','Kamayut Township, Yangon',450000,'monthly',1,1,28,null,'Fully furnished','Demo Property Owner','+959111111111','https://images.unsplash.com/photo-1616486338812-3dadae4b4ace','Furnished bedroom'],
  ['Commercial land in Amarapura','Level commercial land with strong road frontage and flexible potential for a shop or warehouse.','sale','land','Mandalay','Amarapura','Amarapura Township, Mandalay',650000000,null,null,null,null,1200,'Unfurnished','Demo Property Owner','+959111111111','https://images.unsplash.com/photo-1500382017468-9049fed747ef','Open land plot']
];
for (const row of listings) { const listingId=id('listing'); add.run(listingId,owner,row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],row[8],row[9],row[10],row[11],row[12],row[13],row[14],row[15],'published',now,now,now); image.run(id('image'),listingId,row[16],row[17],0,now); }
console.log(`Inserted ${listings.length} demo listings.`);
db.close();

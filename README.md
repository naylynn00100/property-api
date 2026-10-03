# Property Portal API

The API powers the Property Portal web client and future mobile client. It provides authentication, property listings, image uploads, search, and admin moderation through a JSON REST API.

## Requirements

- Node.js 20 or newer.
- npm.

## Install and run locally

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

The server listens on `http://localhost:4000` by default.

Useful URLs:

- Health check: `http://localhost:4000/health`
- API base: `http://localhost:4000/api/v1`
- API documentation: `http://localhost:4000/docs`

## Demo accounts

The seed command creates these local-only accounts. Change them before using a shared environment.

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@property.local` | `ChangeMe123!` |
| Owner | `owner@property.local` | `ChangeMe123!` |

## Configuration

Create a `.env` file when overriding defaults:

```dotenv
PORT=4000
DATABASE_URL=file:./dev.db
JWT_SECRET=replace-this-in-development
CORS_ORIGIN=http://localhost:5173
UPLOAD_DIR=uploads
```

The local SQLite database is `dev.db`; uploaded development images are stored in `uploads/`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with reload. |
| `npm run build` | Type-check and compile the API. |
| `npm start` | Start the compiled server. |
| `npm test` | Run the test suite. |
| `npm run prisma:generate` | Generate the Prisma client. |
| `npm run prisma:migrate` | Apply/create local Prisma migrations. |
| `npm run prisma:seed` | Load local demo users, amenities, and listings. |

## Main endpoints

The full contract is available at `/docs`. The main endpoint groups are:

- `/auth` — register, sign in, and current-user information.
- `/listings` — browse, view, create, edit, delete, change status, and upload images.
- `/me/listings` — list the signed-in user's listings.
- `/admin` — admin listing moderation and user management.

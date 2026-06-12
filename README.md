# Consultation Recording Manager

Full-stack app for managing consultation recordings with metadata, notes, search, and playback.

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer  
**Frontend:** React 19, Vite 8, Tailwind CSS v4, React Router, Framer Motion, Axios

## Project Structure

```
├── server/              # Express API
│   ├── controllers/     # Route handlers
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/       # Auth middleware
│   └── config/          # Multer, DB config
└── client/              # React SPA
    ├── components/      # Reusable UI + landing page
    ├── pages/           # Route pages (auth, dashboard, consultations, landing)
    ├── context/         # Auth + notification providers
    ├── services/        # API service layer
    └── hooks/           # Custom hooks (useTheme)
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally or Atlas URI

### Install & Run

```bash
# Backend
cd server
npm install
cp .env.example .env   # fill in values
npm run dev            # http://localhost:4000

# Frontend
cd client
npm install
npm run dev            # http://localhost:5173
```

## Environment Variables (server/.env)

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `PORT` | Server port (default: 4000) |

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Sign in |
| GET | /api/auth/me | Get current user |
| GET | /api/dashboard/stats | Dashboard stats |
| GET | /api/consultations | List all |
| GET | /api/consultations/search?q= | Search |
| POST | /api/consultations | Upload (multipart) |
| GET | /api/consultations/:id | Get one |
| PUT | /api/consultations/:id | Update |
| DELETE | /api/consultations/:id | Delete |
| GET | /api/consultations/:id/notes | List notes |
| POST | /api/consultations/:id/notes | Add note |
| PUT | /api/notes/:id | Update note |
| DELETE | /api/notes/:id | Delete note |

## Features

- Landing page with dark mode, animations, and responsive design
- JWT authentication with protected routes
- Audio upload with drag-and-drop (MP3, WAV)
- Custom audio player with seek, volume, and mute
- Full-text search across consultations
- Category filtering and sort options
- Inline notes CRUD per consultation
- Real-time notifications
- Mobile-responsive sidebar and cards layout

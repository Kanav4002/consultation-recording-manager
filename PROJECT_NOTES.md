# Project Notes

## Tech Stack

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose 9
- JWT auth (jsonwebtoken + bcryptjs)
- Multer for file uploads (mp3/wav only)

**Frontend**
- React 19 + Vite 8
- Tailwind CSS v4 (CSS-first config)
- React Router 7
- Framer Motion (landing page animations)
- Axios (API layer)

## Architecture

```
Client (React SPA)  ──HTTP──>  Server (Express API)  ──>  MongoDB
                              ──>  uploads/ (audio files)
```

- **Auth:** Register/login returns JWT. Token stored in localStorage, attached via Axios interceptor. 401 triggers auto-redirect to /login.
- **File uploads:** Multer validates format (mp3/wav), saves to `server/uploads/`. Audio served via Express static.
- **Routing:** Public routes (/, /login, /register). Protected routes (/dashboard, /upload, /history, /consultations/:id) wrapped in ProtectedRoute.
- **Landing page:** Separate from dashboard app. Uses Framer Motion animations, dark mode via useTheme hook.

## Assumptions

- MongoDB is running locally or via Atlas (connection string in .env)
- No HTTPS in dev — production deployment handles TLS
- Audio files stored on local filesystem (not S3/cloud yet)
- Single-user per account (no team/organization model)
- No rate limiting or abuse protection beyond auth
- Email not verified on registration

## Future Improvements

1. **AI Transcription** — Automatically transcribe uploaded audio into searchable, timestamped text using Whisper or similar ASR model.
2. **AI Consultation Summarization** — Generate concise session summaries from transcripts or audio, highlighting key points and action items.
3. **Role-Based Access Control (RBAC)** — Support admin, therapist, and viewer roles with granular permissions for accessing consultations and notes.
4. **Cloud file storage** — Migrate from local filesystem to S3/GCS for scalability and reliability.
5. **Email verification & password reset** — Add email flow for account verification and secure password recovery.
6. **Rate limiting** — Protect API endpoints from abuse with request throttling.

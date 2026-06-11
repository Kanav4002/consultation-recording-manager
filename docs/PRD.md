# Product Requirements Document (PRD)

## Consultation Recording Manager

Version: 1.0  
Product Type: Full-stack web application  
Target Delivery Mode: Placement assignment MVP  
Primary Goal: Build a complete, polished, interview-ready MVP within 48 hours

## 1. Product Summary

Consultation Recording Manager is a web application that helps professionals upload, organize, search, review, and manage audio recordings of consultations. It is designed for use cases where a professional needs to preserve conversation history, attach structured metadata, maintain notes, and retrieve specific consultations quickly.

The MVP focuses on delivering a reliable and polished core workflow instead of attempting advanced enterprise or AI-heavy features. The goal is to demonstrate strong full-stack engineering fundamentals, clean architecture, practical product thinking, and good project scoping for placement interviews.

## 2. Product Vision

The product should feel like a focused business tool that solves a real operational problem: consultation records are often scattered across devices, unnamed files, WhatsApp forwards, voice note folders, notebooks, or memory. The application centralizes these consultation assets and makes them usable.

The long-term vision is to evolve it into a smart consultation intelligence platform with transcription, summarization, analytics, and domain-specific workflows. The MVP, however, is intentionally limited to core workflows that can be implemented well in limited time.

## 3. Problem Statement

Professionals who conduct repeated consultations often face the following issues:

- Audio files are stored with poor naming conventions and become hard to identify later.
- Notes are written separately from recordings, causing context loss.
- It is difficult to search for old sessions by client name, date, or purpose.
- Important consultation history is not organized chronologically.
- Local-only file storage risks accidental deletion or device loss.
- Manual tracking makes follow-up, review, and case continuity inefficient.

Without a structured system, consultation management becomes slow, unreliable, and difficult to scale even for a single professional.

## 4. Product Goal

The MVP must allow a user to:

1. Create an account and log in securely.
2. Upload an audio consultation recording.
3. Add metadata to identify the consultation.
4. Add and manage notes for the consultation.
5. View consultation history in a clear chronological list.
6. Search consultations efficiently.
7. Play the recording directly inside the application.
8. View a dashboard with simple but meaningful usage statistics.

The product goal is not feature quantity. The product goal is to deliver a smooth end-to-end workflow that works consistently and is easy to explain in an interview.

## 5. Success Criteria

The MVP will be considered successful if it demonstrates the following:

- A new user can register and log in without issues.
- A consultation can be uploaded with required metadata in a single guided flow.
- The uploaded consultation appears in the list/history immediately.
- A user can add, edit, and delete notes for a consultation.
- A user can search consultations using practical keywords such as client name or consultation type.
- A user can play the uploaded recording directly in the browser.
- A dashboard shows basic counts such as total consultations and total notes or recordings.
- The UI works on both laptop and mobile screen sizes.
- Basic validation and security practices are visible in the implementation.

## 6. Target Users

The application is designed for professionals who repeatedly conduct spoken consultations and need historical reference.

### Primary users

- Therapists and counselors
- Coaches and mentors
- Astrologers
- Lawyers handling client discussions
- Financial advisors
- Independent consultants
- Doctors or clinic staff for non-regulated demo use cases

### User characteristics

These users are usually not looking for a complex ERP system. They want a simple dashboard, searchable records, fast playback, and reliable notes. Their main need is not “audio storage” alone; it is “retrieval with context.”

## 7. User Pain Points

### Pain point 1: File chaos
Audio files may be stored as `Recording_102.mp3`, which gives no business meaning.

### Pain point 2: No searchable context
Even if the file exists, the professional may not remember who the client was, what the meeting was about, or when it happened.

### Pain point 3: Notes are disconnected
Professionals often keep notes in separate notebooks or apps, making it hard to match them to a recording.

### Pain point 4: History is difficult to track
There is no single timeline showing all past client interactions.

### Pain point 5: Retrieval takes too long
During a follow-up session, the professional may need to find an old recording quickly. Without a system, this may take several minutes or fail entirely.

## 8. Scope Strategy

This PRD deliberately prioritizes a complete MVP over a broad feature set.

### Build now
These features provide the highest placement value for the least risk:

- Registration
- JWT login
- Upload audio files
- Store consultation metadata
- Notes CRUD
- Consultation CRUD
- Search consultations
- Consultation history
- Playback
- Dashboard with basic stats
- File validation
- Responsive UI

### Build only if time permits
These features may be added after the core workflow is stable:

- Advanced filters
- Date picker
- Client profile page
- Playback speed control

### Document, do not build
These features should be presented in documentation but excluded from the MVP build:

- Secure download tokens
- Rich text editor
- Client autocomplete
- Weekly email reports
- Notifications
- RBAC
- PDF export
- Cloudinary production-grade enhancements
- Testing strategy details
- CI/CD pipeline details

### Future scope only
Do not build these in the assignment timeline:

- AI transcription
- AI summarization
- Sentiment analysis
- Keyword extraction
- Recommendation engine
- Mobile app
- Live video recording
- Multi-language support
- Calendar integration
- Third-party APIs

## 9. MVP Feature Requirements

## 9.1 User Registration

### Description
A new user can create an account using name, email, and password.

### Why it matters
This demonstrates authentication basics and forms the entry point into all protected workflows.

### Functional behavior
- User enters name, email, password, and confirm password.
- System validates required fields.
- Email must be unique.
- Password must meet minimum rules, such as minimum 6 or 8 characters.
- Password is hashed before storage.
- On success, the system either redirects to login or directly logs the user in.

### Acceptance criteria
- User cannot register with an already used email.
- Password is not stored in plain text.
- Validation errors are shown clearly.

## 9.2 JWT Login

### Description
Registered users can log in using email and password and receive a JWT-based authenticated session.

### Why it matters
JWT is a standard stateless authentication approach and is highly interview-relevant.

### Functional behavior
- User submits email and password.
- Backend verifies credentials.
- On success, server returns JWT token.
- Frontend stores token and sends it in authenticated requests.
- Protected routes should be inaccessible without a valid token.

### Acceptance criteria
- Invalid credentials return an appropriate error.
- Token expires after a defined duration.
- Authenticated pages persist during session refresh if token remains valid.

## 9.3 Upload Audio Files

### Description
User uploads an audio file representing a consultation recording.

### Why it matters
This is the central business capability of the application.

### Functional behavior
- User selects an audio file from device.
- Supported file types should include common formats such as MP3 and WAV.
- Backend receives file using multipart form upload.
- File is stored either locally for MVP or via cloud storage if chosen.
- Consultation record stores the file path or file URL.

### Acceptance criteria
- Unsupported file types are rejected.
- Missing file should show a clear validation message.
- Upload success should create or attach to a consultation record.

## 9.4 Consultation Metadata

### Description
Each consultation must store identifying metadata.

### Required fields
- Client name
- Consultation title or subject
- Consultation date
- Category or type
- Optional description

### Why it matters
Metadata converts a raw audio file into a searchable business record.

### Functional behavior
- Metadata is collected during upload or immediately after upload.
- Required fields must be validated.
- Metadata is saved in the consultations collection.

### Acceptance criteria
- A consultation cannot exist without essential metadata.
- User can edit metadata later.

## 9.5 Notes CRUD

### Description
Users can add, edit, and delete notes associated with a consultation.

### Why it matters
This demonstrates CRUD operations and makes the app practically useful.

### Functional behavior
- User opens a consultation detail view.
- User adds a text note.
- User can update or delete that note.
- Notes remain linked to the consultation.

### Acceptance criteria
- Notes display in the consultation detail section.
- Editing updates the saved content correctly.
- Deleting removes the note from the consultation view.

## 9.6 Consultation CRUD

### Description
Users should be able to create, read, update, and delete consultation records.

### Why it matters
This demonstrates full business-entity management.

### Functional behavior
- Create via upload flow.
- Read through list and detail page.
- Update consultation metadata.
- Delete consultation when necessary.

### Acceptance criteria
- Deleted consultations no longer appear in search or history.
- Editing updates the consultation card and detail view consistently.

## 9.7 Search Consultations

### Description
Users can search consultations using key fields.

### Why it matters
Search is one of the most recruiter-friendly features because it shows product thinking and indexing/query design.

### Functional behavior
- Search input on dashboard or consultation list.
- Search should match at least client name, title, category, and optionally notes.
- Results update after submit or in near real time.

### Acceptance criteria
- Searching for a client name returns matching consultations.
- Empty results show a proper empty state.
- Search should feel fast on normal sample data.

## 9.8 Playback Recording

### Description
Users can listen to the uploaded audio recording directly in the application.

### Why it matters
Playback completes the user workflow and makes the system feel real.

### Functional behavior
- Each consultation detail page or card should include an audio player.
- User can play, pause, seek, and adjust volume using the browser player.

### Acceptance criteria
- Valid uploaded files are playable.
- Broken file references show a graceful fallback message.

## 9.9 Consultation History

### Description
Users can view consultations ordered by newest first.

### Why it matters
This is a simple feature with strong real-world value and low build risk.

### Functional behavior
- Consultation list should sort by created date or consultation date descending.
- User should quickly review recent activity.

### Acceptance criteria
- Latest consultations appear first.
- Order remains consistent after refresh.

## 9.10 Dashboard with Basic Stats

### Description
A dashboard summarizes key usage information.

### Why it matters
Dashboards add presentation value and help the product feel business-oriented.

### Suggested metrics
- Total consultations
- Total audio recordings
- Total notes
- Recent consultations count

### Functional behavior
- Dashboard loads after login.
- Metrics are derived from the logged-in user’s data.

### Acceptance criteria
- Counts are accurate.
- Dashboard loads quickly and is readable on mobile.

## 9.11 File Validation

### Description
System validates uploaded files before accepting them.

### Why it matters
This demonstrates security awareness and backend validation discipline.

### Functional behavior
- Check MIME type or extension.
- Check maximum file size.
- Reject non-audio uploads.
- Return a useful error message.

### Acceptance criteria
- Invalid files are blocked.
- Frontend displays validation errors cleanly.

## 10. Secondary Features (Time Permitting)

## 10.1 Advanced Filters

Possible filters:
- Date range
- Consultation category
- Client name

This should only be implemented if the core search and history flow is already polished.

## 10.2 Date Picker

A simple UX improvement for selecting consultation date. This is low-risk and can be added if the UI is already stable.

## 10.3 Client Profile Page

A dedicated page showing all consultations for one client. Useful, but not essential for the MVP.

## 10.4 Playback Speed Control

This is a good polish feature but not critical for evaluation.

## 11. Out of Scope for MVP

The following are intentionally excluded from implementation:

- Tokenized secure downloads
- WYSIWYG editor for notes
- Notification system
- Role-based access control
- Report export
- AI features of any kind
- Team workflows
- Enterprise compliance tooling

These should be presented in README or future roadmap sections only.

## 12. User Stories

### Authentication
- As a new user, I want to register so I can access the application.
- As a registered user, I want to log in securely so I can access my consultations.

### Consultation management
- As a user, I want to upload an audio file so I can save a consultation.
- As a user, I want to add client and consultation details so I can identify the recording later.
- As a user, I want to edit consultation data so I can correct mistakes.
- As a user, I want to delete a consultation so I can remove unwanted records.

### Notes
- As a user, I want to add notes to a consultation so I can keep observations with the recording.
- As a user, I want to edit notes so I can refine my observations.
- As a user, I want to delete notes so I can remove irrelevant text.

### Retrieval
- As a user, I want to search consultations so I can find an old session quickly.
- As a user, I want to see consultation history so I can review my latest activity.
- As a user, I want to play audio directly so I can revisit the consultation without downloading files.

### Insights
- As a user, I want to see dashboard stats so I can understand my usage at a glance.

## 13. Functional Requirements

### Must-Have Requirements

- The system must allow user registration.
- The system must allow user login using JWT authentication.
- The system must protect private routes using token verification.
- The system must allow users to upload audio files.
- The system must validate uploaded files by type and size.
- The system must allow creation of consultation records with metadata.
- The system must allow users to view a list of their consultations.
- The system must allow users to view a single consultation in detail.
- The system must allow users to edit consultation metadata.
- The system must allow users to delete consultation records.
- The system must allow users to create notes for a consultation.
- The system must allow users to edit notes.
- The system must allow users to delete notes.
- The system must allow keyword-based consultation search.
- The system must display consultation history sorted by newest first.
- The system must provide in-app audio playback.
- The system must display a dashboard with basic statistics.
- The frontend must be responsive across mobile and desktop sizes.

### Good-to-Have Requirements

- The system may support advanced filtering by date or category.
- The system may support a date picker control.
- The system may support a client-specific profile/history page.
- The system may support playback speed options.

### Future Requirements

- The system may support AI transcription.
- The system may support AI-generated summaries.
- The system may support sentiment or keyword analysis.
- The system may support secure expiring download links.
- The system may support notifications and reminders.
- The system may support RBAC for multi-user organizations.

## 14. Non-Functional Requirements

## 14.1 Security

### Implement in MVP
- Passwords must be hashed before database storage.
- JWT tokens must have an expiration time.
- Inputs must be validated on backend.
- Uploaded files must be validated.
- CORS should be configured properly.

### Mention only
- HTTPS/TLS in production
- Rate limiting
- Secure download URLs
- Audit logging

## 14.2 Maintainability

### Implement in MVP
- Follow MVC or layered folder structure.
- Use environment variables for secrets and configuration.
- Provide a good README.
- Keep controller, route, and model logic separated.

### Mention only
- Swagger documentation
- Jest tests
- GitHub Actions CI/CD

## 14.3 Usability

### Implement in MVP
- Responsive layout for common mobile screens.
- Simple upload flow.
- Clear search input.
- Clean dashboard and list views.
- Simple navigation between main screens.

## 14.4 Performance

Target reasonable student-project performance:
- Dashboard should load quickly with sample records.
- Search should feel responsive for normal dataset size.
- Audio playback should start without unnecessary steps.

## 14.5 Reliability

Mention only:
- Daily backups
- Automatic retries
- High uptime targets

## 14.6 Scalability

Mention only:
- Redis caching
- MongoDB sharding
- Node clustering
- CDN and cloud object storage

## 15. Product Workflow

### Main workflow

1. User registers or logs in.
2. User lands on dashboard.
3. User uploads an audio consultation file.
4. User fills consultation metadata.
5. User saves the consultation.
6. User views consultation in history/list.
7. User opens consultation details.
8. User adds or edits notes.
9. User later searches for the consultation.
10. User plays the audio inside the app.

This workflow should be demo-ready from end to end.

## 16. Information Architecture

### Main screens
- Register page
- Login page
- Dashboard page
- Upload consultation page or modal
- Consultation list/history page
- Consultation detail page
- Edit consultation page or modal

### Navigation suggestion
Top navbar or sidebar with:
- Dashboard
- Upload Consultation
- History
- Logout

## 17. Data Model Requirements

### User
Suggested fields:
- `_id`
- `name`
- `email`
- `passwordHash`
- `createdAt`
- `updatedAt`

### Consultation
Suggested fields:
- `_id`
- `userId`
- `clientName`
- `title`
- `category`
- `consultationDate`
- `description`
- `audioUrl` or `audioPath`
- `originalFileName`
- `fileSize`
- `mimeType`
- `createdAt`
- `updatedAt`

### Note
Suggested fields:
- `_id`
- `consultationId`
- `userId`
- `content`
- `createdAt`
- `updatedAt`

### Relationships
- One user can have many consultations.
- One consultation can have one or many notes, depending on implementation choice.
- Notes belong to a consultation and user.

For MVP simplicity, one consultation can have a single editable note field or a small notes array. If time allows, separate note documents are cleaner.

## 18. API Requirements

### Auth APIs
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login user
- `GET /api/auth/me` — get logged-in user

### Consultation APIs
- `POST /api/consultations` — create consultation with metadata
- `GET /api/consultations` — list consultations
- `GET /api/consultations/:id` — get consultation by ID
- `PUT /api/consultations/:id` — update consultation
- `DELETE /api/consultations/:id` — delete consultation
- `GET /api/consultations/search?q=` — search consultations

### Note APIs
- `POST /api/consultations/:id/notes` — create note
- `PUT /api/notes/:id` — update note
- `DELETE /api/notes/:id` — delete note

### Dashboard APIs
- `GET /api/dashboard/stats` — return counts and basic summary metrics

### Upload handling
If using separate upload endpoint:
- `POST /api/upload/audio`

If using combined endpoint:
- Consultation creation may accept multipart form data and metadata together.

## 19. UX Requirements

### UX principles
- Keep UI simple and recruiter-friendly.
- Avoid clutter.
- Prioritize clarity over visual complexity.
- Make the upload-to-playback flow obvious.

### Visual priorities
- Use cards or table/list layout for consultations.
- Show important metadata prominently.
- Use clear call-to-action buttons such as Upload, Save, Search, Play.
- Use empty states when no consultations exist.
- Show validation errors inline.

### Responsive behavior
- Forms should stack vertically on mobile.
- Dashboard cards should wrap cleanly.
- Audio player should remain usable on smaller screens.

## 20. Technical Architecture Guidance

### Frontend
Suggested stack:
- React
- React Router
- Axios or Fetch API
- Context API or Redux if needed
- Basic CSS, Tailwind, or component library if already comfortable

### Backend
Suggested stack:
- Node.js
- Express.js
- Multer for file upload
- JWT for authentication
- bcrypt for password hashing

### Database
Suggested database:
- MongoDB with Mongoose

### Storage
For MVP:
- Local file storage is acceptable if stable and simple.

For documentation:
- Mention Cloudinary as production-ready storage improvement.

## 21. Risks and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Trying to build too many features | High | Strictly follow MVP list only |
| File upload bugs | High | Start backend upload early on Day 1 |
| Frontend state confusion | Medium | Keep forms simple and avoid unnecessary abstractions |
| Search not working well | Medium | Implement simple regex or Mongo text search first |
| UI feels incomplete | Medium | Finish workflow first, then polish |
| Auth issues near deadline | High | Build and test registration/login first |

## 22. Delivery Plan for 48 Hours

### Day 1
- Set up backend and frontend repositories
- Configure MongoDB connection
- Build registration and login APIs
- Add JWT middleware
- Create consultation schema
- Implement audio upload endpoint
- Implement create/list/search consultation APIs

### Day 2 Morning
- Build frontend auth pages
- Build dashboard page
- Build upload form
- Build consultation history/list view
- Build consultation detail page
- Add audio playback

### Day 2 Afternoon
- Add notes CRUD UI
- Improve responsive layout
- Fix edge cases and validation
- Write README
- Write PROJECT_NOTES and AI_USAGE files if needed

### Day 2 Evening
- Record demo video
- Clean GitHub repository
- Remove dead code
- Verify environment variables and setup instructions
- Final submission

## 23. Interview Positioning Guidance

This project should be positioned as a scoped, product-driven MVP rather than a generic CRUD app.

### What to say in interviews
- The project solves a real problem around consultation retrieval and context preservation.
- The main design decision was to build a reliable MVP instead of overbuilding advanced features.
- Authentication, upload handling, search, CRUD, and playback demonstrate real-world full-stack fundamentals.
- Advanced features like AI transcription were intentionally deferred to future scope.

### What recruiters will likely appreciate
- Good scope management
- End-to-end working workflow
- Security basics
- Product clarity
- Professional README and demo

## 24. Documentation Requirements

The GitHub repository should include:

- Project title and summary
- Problem statement
- Features built
- Tech stack
- Architecture overview
- Setup instructions
- Environment variables
- API routes summary
- Demo screenshots
- Future scope
- Known limitations
- Optional: AI usage disclosure if AI-assisted coding was used

## 25. Demo Requirements

The demo should prove the full workflow:

1. Register or log in.
2. Show dashboard.
3. Upload an audio file.
4. Add metadata.
5. Save consultation.
6. Open it from history.
7. Add or edit notes.
8. Search for it.
9. Play the audio.
10. End with dashboard and future scope mention.

The demo should not spend too much time on code. It should prove the product works.

## 26. Release Decision

The MVP is ready for submission when:

- Authentication works reliably.
- Upload and metadata save correctly.
- Notes CRUD works.
- Search works.
- Audio playback works.
- Dashboard loads real values.
- UI is presentable and responsive.
- README is complete.

If optional features threaten stability, they should be removed before submission.

## 27. Final Product Principle

The core principle of this project is:

**A complete, polished MVP that can be confidently demoed and defended is better than an ambitious but broken product.**

This PRD therefore prioritizes implementation discipline, practical business value, and interview-readiness over feature overload.
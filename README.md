# RealTrust

RealTrust — a simple lead generation and admin dashboard application. It uses an Express/MongoDB backend with file uploads and JWT-based admin authentication, and a React + Vite frontend styled with Tailwind CSS.

Quick summary
- Backend: Node.js, Express, MongoDB (Mongoose), bcryptjs, multer, JWT
- Frontend: React (Vite), Tailwind CSS, axios, react-toastify
- Purpose: collect leads and manage projects, clients, and subscribers via an admin dashboard

Repository layout
- `backend/` — Express API, Mongoose models, routes, upload middleware, and `seed.js` for demo data
  - `backend/server.js` — main server entry
  - `backend/seed.js` — creates sample admins, clients, projects, subscribers
  - `backend/models/` — Mongoose models (`Admin`, `Client`, `Project`, `Lead`, `Subscriber`)
  - `backend/routes/` — API route files (admin, client, lead, project, subscriber, upload)
  - `backend/middleware/` — `auth.js`, `upload.js`, `validation.js`, `errorHandler.js`
  - `backend/uploads/` — stored upload files (e.g. `clients/`, `projects/`)

- `frontend/` — React app (Vite + Tailwind)
  - `src/components/landing/` — public site components (Header, Hero, ContactModal, etc.)
  - `src/components/admin/` — admin UI pages (ProjectsManagement, ClientsManagement, etc.)
  - `src/pages/` — routing pages (`LandingPage`, `AdminPage`)
  - `src/services/api.js` — API wrapper used by the frontend

Environment / prerequisites
- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB connection string (Atlas or local)

Backend — setup & run
1. Open a terminal and start the backend:

```powershell
cd backend
npm install
npm run dev
```

Frontend — setup & run
1. Create a `.env` file in `frontend/` with the API URL:

```
VITE_API_URL=http://localhost:5000/api
```

2. Start the frontend dev server:

```powershell
cd frontend
npm install
npm run dev
```

Default development ports (configurable)
- Backend: `5000`
- Frontend (Vite): `5173`

Admin credentials (demo)
- Email: `admin@leadgen.com`
- Password: `admin@123`

File uploads & directories
- Uploaded images are stored in `backend/uploads/clients/` and `backend/uploads/projects/`.
- Upload middleware will auto-create directories when needed.

Key API endpoints (examples)
- POST `/api/admin/login` — admin login (returns JWT)
- GET `/api/projects` — list projects
- POST `/api/projects` — create project (protected, supports file upload)
- GET `/api/clients` — list clients
- POST `/api/leads` — create lead (public contact/hero form)
- POST `/api/subscribers` — create subscriber
- POST `/api/upload` — upload files (multer middleware)

(See `backend/routes/` for the full route list and request bodies.)

Frontend behavior
- Landing page includes a `Hero` form that submits leads to the backend.
- Header/Footer 'Contact' buttons open a modal with the same form as the `Hero`.
- Admin area (protected) manages Projects, Clients, Contacts, Subscribers, and file uploads.

Seeding & password hashing notes
- Admin password hashing uses a Mongoose `pre('save')` hook with `bcryptjs`.
- `seed.js` saves admin documents individually (not `insertMany`) so the hook runs.

Troubleshooting
- If ports are in use: stop processes holding port `5000` (backend) or change the `PORT` env variable.
- If uploads fail with HTTP 500: ensure `backend/uploads/` subfolders exist or allow the middleware to create them.
- If the frontend cannot reach the backend: verify `VITE_API_URL` and CORS settings on the backend.

Development notes & conventions
- Styling: Tailwind CSS; admin UI uses a dark `slate` theme with cyan/blue accents.
- State & auth: JWTs stored in `localStorage`, managed via `AuthContext` on the frontend.
- Use the `axios` wrapper at `frontend/src/services/api.js` for API calls.

Contributing
- Open an issue or PR with focused changes. Keep styling consistent with Tailwind conventions and existing UI patterns.

License
- This project does not include a license file by default. Add one if you plan to publish.

Contact / maintainer
- For local help: run the backend first, then the frontend; check backend logs for API errors.

Maintainer / author
- **Name:** Prakhar Attarde
- **Email:** prakharattarde95@gmail.com
- **GitHub:** https://github.com/Prakhar2818

Live demo
- **Staging / Live Demo:** https://real-trust-dun.vercel.app
- **Frontend (dev):** http://localhost:5173
- **Backend API (local):** http://localhost:5000/api
- **Email:** prakharattarde95@gmail.com

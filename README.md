# Lead Generation App

**Simple lead generation + admin dashboard** — a full-stack (MERN-like) lead generation application: an Express/MongoDB backend with file uploads and JWT admin authentication, and a React + Vite frontend styled with Tailwind CSS.

**Quick summary**
- Backend: Node.js, Express, MongoDB (Mongoose), bcryptjs, multer, JWT
- Frontend: React (Vite), Tailwind CSS, axios, react-toastify
- Purpose: collect leads, manage projects/clients/subscribers, admin dashboard for CRUD and uploads

**Repository layout**
- `backend/` — Express API, models, routes, upload middleware, `seed.js` to populate demo data
  - `backend/server.js` — main server entry
  - `backend/seed.js` — creates sample admins, clients, projects, subscribers
  - `backend/models/` — Mongoose models (`Admin`, `Client`, `Project`, `Lead`, `Subscriber`)
  - `backend/routes/` — API route files (admin, client, lead, project, subscriber, upload)
  - `backend/middleware/` — `auth.js`, `upload.js`, `validation.js`, `errorHandler.js`
  - `backend/uploads/` — persisted uploaded images (e.g. `clients/`, `projects/`)

- `frontend/` — React app (Vite + Tailwind)
  - `src/components/landing/` — public site components (Header, Hero, ContactModal, etc.)
  - `src/components/admin/` — Admin UI pages (ProjectsManagement, ClientsManagement, etc.)
  - `src/pages/` — routing pages (`LandingPage`, `AdminPage`)
  - `src/services/api.js` — API wrapper used by frontend


**Environment / Prerequisites**
- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB connection string (Atlas or local)


**Backend — Setup & run**
1. Open a terminal and start the backend:

```powershell
cd backend
npm install
# create env file or set environment variables
# example .env (not committed):
# MONGO_URI=<your-mongo-uri>
# JWT_SECRET=<your-jwt-secret>
# PORT=5000

npm run dev
```

**Frontend — Setup & run**
1. Configure env for frontend (create `.env` in `frontend/`):

```
VITE_API_URL=http://localhost:5000/api
```

2. Start frontend dev server:

```powershell
cd frontend
npm install
npm run dev
```

Default dev ports used by this project (configurable):
- Backend: `5000`
- Frontend (Vite): `5173`


**Admin credentials (demo)**
- Email: `admin@leadgen.com`
- Password: `admin@123`

(You can change or add admins via the seed script or directly in the database.)


**File uploads & directories**
- Uploaded images are stored in `backend/uploads/clients/` and `backend/uploads/projects/`.
- The upload middleware will auto-create directories if missing.


**Key API endpoints (examples)**
- POST `/api/admin/login` — admin login (returns JWT)
- GET `/api/projects` — list projects
- POST `/api/projects` — create project (protected, supports file upload)
- GET `/api/clients` — list clients
- POST `/api/leads` — create lead (public contact/hero form)
- POST `/api/subscribers` — create subscriber
- POST `/api/upload` — upload files (multer middleware)

(See `backend/routes/` for the full route list and expected request bodies.)


**Frontend behavior**
- Landing page contains a `Hero` form (right side) that submits leads to the backend.
- Header/Footer 'Contact' buttons open a modal with the same form used in the `Hero` section.
- Admin area (protected) allows management of Projects, Clients, Contacts, Subscribers and file uploads.


**Seeding & Password hashing notes**
- Admin password hashing is implemented with a Mongoose `pre('save')` hook using `bcryptjs`.
- To ensure hashing runs, `seed.js` saves admin documents individually (not `insertMany`).


**Troubleshooting**
- If ports are in use: stop processes holding port `5000` (backend) or change `PORT` in env.
- If uploads fail with 500: ensure `backend/uploads/` subfolders exist or let middleware create them.
- If frontend cannot reach backend: verify `VITE_API_URL` value and CORS settings in backend.


**Development notes & conventions**
- Styling: Tailwind CSS; the admin UI uses a dark `slate` theme with cyan/blue gradients.
- State and auth: JWTs are stored in `localStorage` and managed via frontend `AuthContext`.
- Use `axios` wrapper at `frontend/src/services/api.js` for API calls.


**Contributing**
- Open an issue or PR with focused changes. Keep styling consistent with Tailwind variables and existing UI patterns.


**License**
- This project does not include a license file by default. Add one if you plan to publish.


**Contact / Maintainer**
- Repo: `lead-genration-app` (owner: `Divyx09`)
- For local help: run the backend first, then the frontend; check backend logs for API errors.

**Maintainer / Author Details**
- **Name:** Prakhar Attarde
- **Email:** prakharattarde95@gmail.com
- **GitHub:** `https://github.com/Prakhar2818`

**Live Demo**
- **Staging / Live Demo URL:** `https://real-trust-dun.vercel.app/admin/clients` (Vercel Deploy)
- **Frontend Demo (Vite dev):** `http://localhost:5173` (local)
- **Backend API (local):** `http://localhost:5000/api` (local)

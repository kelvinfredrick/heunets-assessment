# TeamBoard Workspace

TeamBoard is a functional, minimalist Kanban task board and project directory application built with NestJS (Backend) and React + Redux Toolkit (Frontend). It uses MongoDB for data persistence and implements secure HTTP-Only cookie-based session authentication.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** (v9 or higher)
- **MongoDB** running locally on port `27017` (or accessible via a remote connection string)
- **Docker** (optional, for running MongoDB in a container)

---

## Quick Start (Local Setup)

### 1. Database Setup (MongoDB)
If you have Docker installed, the easiest way to start MongoDB is using the provided Docker Compose configuration in the root folder:
```bash
docker-compose up -d
```
This spins up a MongoDB container named `teamboard-db` listening on port `27017`.

---

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Copy the example environment variables file and configure your settings:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server in development (watch) mode:
   ```bash
   npm run start:dev
   ```
The backend server will launch at `http://localhost:5005/api`.

---

### 3. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Copy the example environment variables file:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development build and server:
   ```bash
   npm run dev
   ```
Vite will start the client, typically at `http://localhost:5173`. Open this URL in your web browser.

---

## Project Structure

```
├── backend/                  # NestJS server application
│   ├── src/
│   │   ├── auth/             # Passport JWT & cookie strategy
│   │   ├── projects/         # Project schemas and controllers
│   │   ├── tasks/            # Task schemas and controllers
│   │   └── main.ts           # CORS, global validation, and cookie setup
│   └── .env.example          # Environment template
│
├── frontend/                 # Vite + React client application
│   ├── src/
│   │   ├── components/       # Modals, layout, sidebar, taskcards
│   │   ├── pages/            # Dashboard, Projects, Tasks
│   │   ├── store/            # Redux state slices (auth, projects, tasks)
│   │   └── services/api.js   # Fetch request client wrapper
│   └── .env.example          # Environment template
│
└── docker-compose.yml        # Local MongoDB setup
```

---

## Key Configuration Variables

### Backend `.env`
- `PORT`: Server port (default: `5005`).
- `MONGODB_URI`: Connection string (default: `mongodb://localhost:27017/teamboard`).
- `JWT_SECRET`: Secret key used for signing session tokens.
- `JWT_EXPIRATION`: Token validity duration (default: `24h`).

### Frontend `.env`
- `VITE_API_URL`: Root path of the backend REST service (default: `http://localhost:5005/api`).

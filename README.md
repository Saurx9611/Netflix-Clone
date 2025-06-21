# Netflix Clone

A full-stack Netflix clone built with React/Next.js frontend and Django FastAPI backend.

## Features

- 🎬 Netflix-like interface and user experience
- 👤 User authentication and account management
- 🎥 Movie/TV show browsing and search
- 📱 Responsive design for all devices
- 🎭 Movie details, trailers, and recommendations
- 📺 Video player interface
- 🔍 Advanced search and filtering
- 📋 Watchlist and favorites
- ⭐ Rating and review system

## Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Query** - Data fetching
- **Zustand** - State management

### Backend

- **Django** - Web framework
- **FastAPI** - API framework
- **PostgreSQL** - Database
- **Redis** - Caching
- **JWT** - Authentication
- **Celery** - Background tasks

## Project Structure

```
netflix-clone/
├── frontend/          # Next.js application
├── backend/           # Django FastAPI application
├── shared/            # Shared types and utilities
└── docs/             # Documentation
```

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL
- Redis

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Environment Variables

Create `.env.local` in frontend and `.env` in backend:

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
```

### Backend (.env)

```
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/netflix_clone
REDIS_URL=redis://localhost:6379
TMDB_API_KEY=your_tmdb_api_key
```

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/movies` - Get movies
- `GET /api/movies/{id}` - Get movie details
- `POST /api/watchlist` - Add to watchlist
- `GET /api/recommendations` - Get recommendations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

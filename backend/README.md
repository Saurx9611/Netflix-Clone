# Netflix Clone Backend

A Django REST API backend for a Netflix clone with Google OAuth authentication and content management.

## Features

- **User Authentication**: JWT-based authentication with Google OAuth support
- **Content Management**: Movies, TV shows, genres, and user interactions
- **User Features**: Watchlist, ratings, and personalized recommendations
- **Search & Filtering**: Advanced search and filtering capabilities
- **Admin Interface**: Comprehensive Django admin for content management

## Tech Stack

- **Framework**: Django 5.2.3
- **API**: Django REST Framework
- **Authentication**: JWT with Google OAuth
- **Database**: SQLite (development) / PostgreSQL (production)
- **CORS**: django-cors-headers
- **Filtering**: django-filter

## Setup Instructions

### 1. Clone and Navigate

```bash
cd backend
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
GOOGLE_OAUTH2_CLIENT_ID=your-google-client-id
GOOGLE_OAUTH2_CLIENT_SECRET=your-google-client-secret
```

### 4. Database Setup

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Create Superuser

```bash
python manage.py createsuperuser
```

### 6. Populate Sample Data

```bash
python manage.py populate_sample_data
```

### 7. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

## API Endpoints

### Authentication

- `POST /api/v1/accounts/register/` - User registration
- `POST /api/v1/accounts/login/` - User login
- `POST /api/v1/accounts/google-oauth/` - Google OAuth authentication
- `POST /api/v1/accounts/logout/` - User logout
- `POST /api/v1/accounts/token/refresh/` - Refresh JWT token
- `GET /api/v1/accounts/profile/` - Get user profile
- `PUT /api/v1/accounts/profile/` - Update user profile
- `POST /api/v1/accounts/change-password/` - Change password

### Content

- `GET /api/v1/content/genres/` - List all genres
- `GET /api/v1/content/movies/` - List movies with filtering
- `GET /api/v1/content/movies/{id}/` - Get movie details
- `GET /api/v1/content/tv-shows/` - List TV shows with filtering
- `GET /api/v1/content/tv-shows/{id}/` - Get TV show details
- `GET /api/v1/content/featured/` - Get featured content
- `GET /api/v1/content/new-releases/` - Get new releases
- `GET /api/v1/content/trending/` - Get trending content

### Search & Recommendations

- `POST /api/v1/content/search/` - Search content
- `POST /api/v1/content/recommendations/` - Get personalized recommendations

### User Interactions

- `GET /api/v1/content/watchlist/` - Get user watchlist
- `POST /api/v1/content/watchlist/` - Add to watchlist
- `PUT /api/v1/content/watchlist/{id}/` - Update watchlist item
- `DELETE /api/v1/content/watchlist/{id}/` - Remove from watchlist
- `GET /api/v1/content/ratings/` - Get user ratings
- `POST /api/v1/content/ratings/` - Rate content
- `PUT /api/v1/content/ratings/{id}/` - Update rating
- `DELETE /api/v1/content/ratings/{id}/` - Delete rating

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (for frontend)
   - `http://localhost:8000/api/v1/accounts/google-oauth/` (for backend)
6. Copy Client ID and Client Secret to your `.env` file

## API Usage Examples

### Register a User

```bash
curl -X POST http://localhost:8000/api/v1/accounts/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword123",
    "password_confirm": "securepassword123",
    "first_name": "Test",
    "last_name": "User"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/v1/accounts/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepassword123"
  }'
```

### Get Movies

```bash
curl -X GET "http://localhost:8000/api/v1/content/movies/?search=batman&genre=Action" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Add to Watchlist

```bash
curl -X POST http://localhost:8000/api/v1/content/watchlist/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "movie_id": 1
  }'
```

## Models

### User

- Custom user model with Google OAuth support
- Profile information (bio, date of birth, phone number)
- Netflix-specific fields (subscription plan, active status)

### Content Models

- **Genre**: Categories for content classification
- **Movie**: Movie information with metadata
- **TVShow**: TV series information with seasons/episodes
- **UserWatchlist**: User's saved content
- **UserRating**: User ratings and reviews

## Admin Interface

Access the Django admin at `http://localhost:8000/admin/` to manage:

- Users and their profiles
- Movies and TV shows
- Genres and categories
- User watchlists and ratings

## Development

### Running Tests

```bash
python manage.py test
```

### Creating Migrations

```bash
python manage.py makemigrations
```

### Database Reset

```bash
python manage.py flush
python manage.py populate_sample_data
```

## Production Deployment

1. Set `DEBUG=False` in settings
2. Use PostgreSQL database
3. Configure proper CORS settings
4. Set up environment variables
5. Use a production WSGI server (Gunicorn)
6. Configure static file serving
7. Set up SSL/HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is for educational purposes only.

# Google OAuth Setup Guide

## Frontend Setup

1. Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Backend Setup

1. Create a `.env` file in the backend directory with:

```
SECRET_KEY=your-secret-key-here
DEBUG=True
GOOGLE_OAUTH2_CLIENT_ID=your-google-client-id-here
GOOGLE_OAUTH2_CLIENT_SECRET=your-google-client-secret-here
```

## Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:3000`
7. Add authorized redirect URIs:
   - `http://localhost:3000`
8. Copy the Client ID and Client Secret

## Usage

After setup:

1. Start the backend: `cd backend && python manage.py runserver`
2. Start the frontend: `cd frontend && npm run dev`
3. Go to `/login` and click "Continue with Google"

The Google OAuth flow will now work properly!

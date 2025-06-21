from django.core.management.base import BaseCommand
from datetime import date
from content.models import Genre, Movie, TVShow


class Command(BaseCommand):
    help = 'Populate database with sample movies, TV shows, and genres'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create genres
        genres_data = [
            {'name': 'Action', 'description': 'High-energy action films'},
            {'name': 'Comedy', 'description': 'Humorous and entertaining content'},
            {'name': 'Drama', 'description': 'Serious and emotional storytelling'},
            {'name': 'Horror', 'description': 'Scary and suspenseful content'},
            {'name': 'Romance', 'description': 'Love stories and romantic content'},
            {'name': 'Sci-Fi', 'description': 'Science fiction and futuristic content'},
            {'name': 'Thriller', 'description': 'Suspenseful and exciting content'},
        ]
        
        genres = {}
        for genre_data in genres_data:
            genre, created = Genre.objects.get_or_create(
                name=genre_data['name'],
                defaults={'description': genre_data['description']}
            )
            genres[genre.name] = genre
            if created:
                self.stdout.write(f'Created genre: {genre.name}')
        
        # Create sample movies
        movies_data = [
            {
                'title': 'The Dark Knight',
                'description': 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                'release_date': date(2008, 7, 18),
                'duration': 152,
                'rating': 'PG-13',
                'poster_url': 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
                'backdrop_url': 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg',
                'director': 'Christopher Nolan',
                'cast': ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
                'is_featured': True,
                'is_trending': True,
                'genres': ['Action', 'Drama', 'Thriller']
            },
            {
                'title': 'Inception',
                'description': 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                'release_date': date(2010, 7, 16),
                'duration': 148,
                'rating': 'PG-13',
                'poster_url': 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
                'backdrop_url': 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
                'director': 'Christopher Nolan',
                'cast': ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
                'is_featured': True,
                'is_trending': False,
                'genres': ['Action', 'Sci-Fi', 'Thriller']
            }
        ]
        
        for movie_data in movies_data:
            movie, created = Movie.objects.get_or_create(
                title=movie_data['title'],
                defaults={
                    'description': movie_data['description'],
                    'release_date': movie_data['release_date'],
                    'duration': movie_data['duration'],
                    'rating': movie_data['rating'],
                    'poster_url': movie_data['poster_url'],
                    'backdrop_url': movie_data['backdrop_url'],
                    'director': movie_data['director'],
                    'cast': movie_data['cast'],
                    'is_featured': movie_data['is_featured'],
                    'is_trending': movie_data['is_trending'],
                }
            )
            
            # Add genres
            for genre_name in movie_data['genres']:
                if genre_name in genres:
                    movie.genres.add(genres[genre_name])
            
            if created:
                self.stdout.write(f'Created movie: {movie.title}')
        
        # Create sample TV shows
        tv_shows_data = [
            {
                'title': 'Breaking Bad',
                'description': 'A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family\'s financial future.',
                'first_air_date': date(2008, 1, 20),
                'last_air_date': date(2013, 9, 29),
                'number_of_seasons': 5,
                'number_of_episodes': 62,
                'rating': 'TV-MA',
                'poster_url': 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                'backdrop_url': 'https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
                'creator': 'Vince Gilligan',
                'cast': ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn'],
                'is_featured': True,
                'is_trending': True,
                'status': 'ended',
                'genres': ['Drama', 'Thriller']
            },
            {
                'title': 'Stranger Things',
                'description': 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.',
                'first_air_date': date(2016, 7, 15),
                'number_of_seasons': 4,
                'number_of_episodes': 34,
                'rating': 'TV-14',
                'poster_url': 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
                'backdrop_url': 'https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
                'creator': 'The Duffer Brothers',
                'cast': ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
                'is_featured': True,
                'is_trending': False,
                'status': 'ongoing',
                'genres': ['Drama', 'Horror', 'Sci-Fi']
            }
        ]
        
        for tv_show_data in tv_shows_data:
            tv_show, created = TVShow.objects.get_or_create(
                title=tv_show_data['title'],
                defaults={
                    'description': tv_show_data['description'],
                    'first_air_date': tv_show_data['first_air_date'],
                    'last_air_date': tv_show_data.get('last_air_date'),
                    'number_of_seasons': tv_show_data['number_of_seasons'],
                    'number_of_episodes': tv_show_data['number_of_episodes'],
                    'rating': tv_show_data['rating'],
                    'poster_url': tv_show_data['poster_url'],
                    'backdrop_url': tv_show_data['backdrop_url'],
                    'creator': tv_show_data['creator'],
                    'cast': tv_show_data['cast'],
                    'is_featured': tv_show_data['is_featured'],
                    'is_trending': tv_show_data['is_trending'],
                    'status': tv_show_data['status'],
                }
            )
            
            # Add genres
            for genre_name in tv_show_data['genres']:
                if genre_name in genres:
                    tv_show.genres.add(genres[genre_name])
            
            if created:
                self.stdout.write(f'Created TV show: {tv_show.title}')
        
        self.stdout.write(
            self.style.SUCCESS('Successfully created sample data!')
        ) 
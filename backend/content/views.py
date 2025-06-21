from django.shortcuts import render
from rest_framework import status, generics, permissions, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.utils import timezone
from datetime import datetime

from .models import Movie, TVShow, Genre, UserWatchlist, UserRating
from .serializers import (
    MovieSerializer, TVShowSerializer, GenreSerializer,
    UserWatchlistSerializer, UserRatingSerializer,
    ContentSearchSerializer, ContentRecommendationSerializer
)


class GenreListView(generics.ListAPIView):
    """View for listing all genres"""
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [permissions.AllowAny]


class MovieListView(generics.ListAPIView):
    """View for listing movies with filtering and search"""
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['genres', 'rating', 'is_featured', 'is_trending']
    search_fields = ['title', 'description', 'director']
    ordering_fields = ['title', 'release_date', 'duration']
    ordering = ['-release_date']
    
    def get_queryset(self):
        queryset = Movie.objects.all()
        
        # Filter by year
        year = self.request.query_params.get('year', None)
        if year:
            queryset = queryset.filter(release_date__year=year)
        
        # Filter by genre name
        genre_name = self.request.query_params.get('genre_name', None)
        if genre_name:
            queryset = queryset.filter(genres__name__icontains=genre_name)
        
        return queryset


class MovieDetailView(generics.RetrieveAPIView):
    """View for getting movie details"""
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    permission_classes = [permissions.AllowAny]


class TVShowListView(generics.ListAPIView):
    """View for listing TV shows with filtering and search"""
    serializer_class = TVShowSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['genres', 'rating', 'is_featured', 'is_trending', 'status']
    search_fields = ['title', 'description', 'creator']
    ordering_fields = ['title', 'first_air_date', 'number_of_seasons']
    ordering = ['-first_air_date']
    
    def get_queryset(self):
        queryset = TVShow.objects.all()
        
        # Filter by year
        year = self.request.query_params.get('year', None)
        if year:
            queryset = queryset.filter(first_air_date__year=year)
        
        # Filter by genre name
        genre_name = self.request.query_params.get('genre_name', None)
        if genre_name:
            queryset = queryset.filter(genres__name__icontains=genre_name)
        
        return queryset


class TVShowDetailView(generics.RetrieveAPIView):
    """View for getting TV show details"""
    queryset = TVShow.objects.all()
    serializer_class = TVShowSerializer
    permission_classes = [permissions.AllowAny]


class FeaturedContentView(APIView):
    """View for getting featured content"""
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        featured_movies = Movie.objects.filter(is_featured=True)[:5]
        featured_tv_shows = TVShow.objects.filter(is_featured=True)[:5]
        trending_movies = Movie.objects.filter(is_trending=True)[:5]
        trending_tv_shows = TVShow.objects.filter(is_trending=True)[:5]
        
        return Response({
            'featured_movies': MovieSerializer(featured_movies, many=True).data,
            'featured_tv_shows': TVShowSerializer(featured_tv_shows, many=True).data,
            'trending_movies': MovieSerializer(trending_movies, many=True).data,
            'trending_tv_shows': TVShowSerializer(trending_tv_shows, many=True).data,
        })


class ContentSearchView(APIView):
    """View for searching content"""
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = ContentSearchSerializer(data=request.data)
        if serializer.is_valid():
            query = serializer.validated_data['query']
            content_type = serializer.validated_data.get('content_type')
            genre = serializer.validated_data.get('genre')
            year = serializer.validated_data.get('year')
            page = serializer.validated_data.get('page', 1)
            page_size = serializer.validated_data.get('page_size', 20)
            
            # Build search query
            search_query = Q(title__icontains=query) | Q(description__icontains=query)
            
            results = {}
            
            # Search movies
            if not content_type or content_type == 'movie':
                movies = Movie.objects.filter(search_query)
                if genre:
                    movies = movies.filter(genres__name__icontains=genre)
                if year:
                    movies = movies.filter(release_date__year=year)
                
                start = (page - 1) * page_size
                end = start + page_size
                results['movies'] = {
                    'count': movies.count(),
                    'results': MovieSerializer(movies[start:end], many=True).data
                }
            
            # Search TV shows
            if not content_type or content_type == 'tv_show':
                tv_shows = TVShow.objects.filter(search_query)
                if genre:
                    tv_shows = tv_shows.filter(genres__name__icontains=genre)
                if year:
                    tv_shows = tv_shows.filter(first_air_date__year=year)
                
                start = (page - 1) * page_size
                end = start + page_size
                results['tv_shows'] = {
                    'count': tv_shows.count(),
                    'results': TVShowSerializer(tv_shows[start:end], many=True).data
                }
            
            return Response(results, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContentRecommendationView(APIView):
    """View for getting content recommendations"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = ContentRecommendationSerializer(data=request.data)
        if serializer.is_valid():
            content_type = serializer.validated_data.get('content_type')
            genre = serializer.validated_data.get('genre')
            limit = serializer.validated_data.get('limit', 10)
            
            recommendations = {}
            
            # Get user's watch history
            user_watchlist = UserWatchlist.objects.filter(user=request.user)
            watched_movies = user_watchlist.filter(movie__isnull=False).values_list('movie__genres__name', flat=True)
            watched_tv_shows = user_watchlist.filter(tv_show__isnull=False).values_list('tv_show__genres__name', flat=True)
            
            # Recommend movies
            if not content_type or content_type == 'movie':
                movie_recommendations = Movie.objects.exclude(
                    id__in=user_watchlist.filter(movie__isnull=False).values_list('movie_id', flat=True)
                )
                
                if genre:
                    movie_recommendations = movie_recommendations.filter(genres__name__icontains=genre)
                elif watched_movies:
                    # Recommend based on user's preferred genres
                    movie_recommendations = movie_recommendations.filter(
                        genres__name__in=watched_movies
                    ).distinct()
                
                recommendations['movies'] = MovieSerializer(
                    movie_recommendations[:limit], many=True
                ).data
            
            # Recommend TV shows
            if not content_type or content_type == 'tv_show':
                tv_recommendations = TVShow.objects.exclude(
                    id__in=user_watchlist.filter(tv_show__isnull=False).values_list('tv_show_id', flat=True)
                )
                
                if genre:
                    tv_recommendations = tv_recommendations.filter(genres__name__icontains=genre)
                elif watched_tv_shows:
                    # Recommend based on user's preferred genres
                    tv_recommendations = tv_recommendations.filter(
                        genres__name__in=watched_tv_shows
                    ).distinct()
                
                recommendations['tv_shows'] = TVShowSerializer(
                    tv_recommendations[:limit], many=True
                ).data
            
            return Response(recommendations, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserWatchlistView(generics.ListCreateAPIView):
    """View for user watchlist management"""
    serializer_class = UserWatchlistSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserWatchlist.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserWatchlistDetailView(generics.RetrieveUpdateDestroyAPIView):
    """View for individual watchlist item management"""
    serializer_class = UserWatchlistSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserWatchlist.objects.filter(user=self.request.user)


class UserRatingView(generics.ListCreateAPIView):
    """View for user ratings"""
    serializer_class = UserRatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserRating.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserRatingDetailView(generics.RetrieveUpdateDestroyAPIView):
    """View for individual rating management"""
    serializer_class = UserRatingSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserRating.objects.filter(user=self.request.user)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def new_releases_view(request):
    """View for getting new releases"""
    # Get movies and TV shows from the last 30 days
    thirty_days_ago = timezone.now().date() - timezone.timedelta(days=30)
    
    new_movies = Movie.objects.filter(release_date__gte=thirty_days_ago)[:10]
    new_tv_shows = TVShow.objects.filter(first_air_date__gte=thirty_days_ago)[:10]
    
    return Response({
        'new_movies': MovieSerializer(new_movies, many=True).data,
        'new_tv_shows': TVShowSerializer(new_tv_shows, many=True).data,
    })


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def trending_content_view(request):
    """View for getting trending content"""
    trending_movies = Movie.objects.filter(is_trending=True)[:10]
    trending_tv_shows = TVShow.objects.filter(is_trending=True)[:10]
    
    return Response({
        'trending_movies': MovieSerializer(trending_movies, many=True).data,
        'trending_tv_shows': TVShowSerializer(trending_tv_shows, many=True).data,
    })

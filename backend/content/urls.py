from django.urls import path
from . import views

app_name = 'content'

urlpatterns = [
    # Genres
    path('genres/', views.GenreListView.as_view(), name='genre-list'),
    
    # Movies
    path('movies/', views.MovieListView.as_view(), name='movie-list'),
    path('movies/<int:pk>/', views.MovieDetailView.as_view(), name='movie-detail'),
    
    # TV Shows
    path('tv-shows/', views.TVShowListView.as_view(), name='tv-show-list'),
    path('tv-shows/<int:pk>/', views.TVShowDetailView.as_view(), name='tv-show-detail'),
    
    # Featured and trending content
    path('featured/', views.FeaturedContentView.as_view(), name='featured-content'),
    path('new-releases/', views.new_releases_view, name='new-releases'),
    path('trending/', views.trending_content_view, name='trending-content'),
    
    # Search and recommendations
    path('search/', views.ContentSearchView.as_view(), name='content-search'),
    path('recommendations/', views.ContentRecommendationView.as_view(), name='content-recommendations'),
    
    # User watchlist
    path('watchlist/', views.UserWatchlistView.as_view(), name='user-watchlist'),
    path('watchlist/<int:pk>/', views.UserWatchlistDetailView.as_view(), name='user-watchlist-detail'),
    
    # User ratings
    path('ratings/', views.UserRatingView.as_view(), name='user-ratings'),
    path('ratings/<int:pk>/', views.UserRatingDetailView.as_view(), name='user-rating-detail'),
] 
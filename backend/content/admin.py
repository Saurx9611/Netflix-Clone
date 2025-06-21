from django.contrib import admin
from .models import Genre, Movie, TVShow, UserWatchlist, UserRating


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    """Admin interface for Genre model"""
    list_display = ['name', 'description']
    search_fields = ['name']
    ordering = ['name']


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    """Admin interface for Movie model"""
    list_display = [
        'title', 'director', 'release_date', 'duration', 'rating',
        'is_featured', 'is_trending', 'created_at'
    ]
    list_filter = [
        'rating', 'is_featured', 'is_trending', 'release_date',
        'genres', 'created_at'
    ]
    search_fields = ['title', 'description', 'director', 'cast']
    filter_horizontal = ['genres']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (None, {'fields': ('title', 'description')}),
        ('Details', {
            'fields': ('release_date', 'duration', 'rating', 'director', 'cast')
        }),
        ('Media', {
            'fields': ('poster_url', 'backdrop_url', 'trailer_url')
        }),
        ('Categories', {
            'fields': ('genres', 'is_featured', 'is_trending')
        }),
        ('External', {
            'fields': ('tmdb_id',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ['-release_date']


@admin.register(TVShow)
class TVShowAdmin(admin.ModelAdmin):
    """Admin interface for TVShow model"""
    list_display = [
        'title', 'creator', 'first_air_date', 'number_of_seasons',
        'number_of_episodes', 'rating', 'status', 'is_featured', 'is_trending'
    ]
    list_filter = [
        'rating', 'status', 'is_featured', 'is_trending', 'first_air_date',
        'genres', 'created_at'
    ]
    search_fields = ['title', 'description', 'creator', 'cast']
    filter_horizontal = ['genres']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        (None, {'fields': ('title', 'description')}),
        ('Details', {
            'fields': (
                'first_air_date', 'last_air_date', 'number_of_seasons',
                'number_of_episodes', 'rating', 'creator', 'cast', 'status'
            )
        }),
        ('Media', {
            'fields': ('poster_url', 'backdrop_url', 'trailer_url')
        }),
        ('Categories', {
            'fields': ('genres', 'is_featured', 'is_trending')
        }),
        ('External', {
            'fields': ('tmdb_id',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ['-first_air_date']


@admin.register(UserWatchlist)
class UserWatchlistAdmin(admin.ModelAdmin):
    """Admin interface for UserWatchlist model"""
    list_display = [
        'user', 'get_content_title', 'is_watched', 'added_at', 'watched_at'
    ]
    list_filter = ['is_watched', 'added_at', 'watched_at']
    search_fields = ['user__username', 'user__email', 'movie__title', 'tv_show__title']
    readonly_fields = ['added_at']
    
    def get_content_title(self, obj):
        """Get the title of the content (movie or TV show)"""
        if obj.movie:
            return f"Movie: {obj.movie.title}"
        elif obj.tv_show:
            return f"TV Show: {obj.tv_show.title}"
        return "Unknown"
    get_content_title.short_description = 'Content'
    
    fieldsets = (
        (None, {'fields': ('user',)}),
        ('Content', {
            'fields': ('movie', 'tv_show')
        }),
        ('Status', {
            'fields': ('is_watched', 'watched_at')
        }),
        ('Timestamps', {
            'fields': ('added_at',),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ['-added_at']


@admin.register(UserRating)
class UserRatingAdmin(admin.ModelAdmin):
    """Admin interface for UserRating model"""
    list_display = [
        'user', 'get_content_title', 'rating', 'created_at', 'updated_at'
    ]
    list_filter = ['rating', 'created_at', 'updated_at']
    search_fields = ['user__username', 'user__email', 'movie__title', 'tv_show__title', 'review']
    readonly_fields = ['created_at', 'updated_at']
    
    def get_content_title(self, obj):
        """Get the title of the content (movie or TV show)"""
        if obj.movie:
            return f"Movie: {obj.movie.title}"
        elif obj.tv_show:
            return f"TV Show: {obj.tv_show.title}"
        return "Unknown"
    get_content_title.short_description = 'Content'
    
    fieldsets = (
        (None, {'fields': ('user',)}),
        ('Content', {
            'fields': ('movie', 'tv_show')
        }),
        ('Rating', {
            'fields': ('rating', 'review')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    ordering = ['-created_at']

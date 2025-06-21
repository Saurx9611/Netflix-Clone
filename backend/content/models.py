from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Genre(models.Model):
    """Genre model for categorizing content"""
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'genres'
    
    def __str__(self):
        return self.name


class Movie(models.Model):
    """Movie model for Netflix movies"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    release_date = models.DateField()
    duration = models.IntegerField(help_text="Duration in minutes")
    rating = models.CharField(max_length=10, choices=[
        ('G', 'G'),
        ('PG', 'PG'),
        ('PG-13', 'PG-13'),
        ('R', 'R'),
        ('NC-17', 'NC-17'),
    ])
    poster_url = models.URLField(max_length=500)
    backdrop_url = models.URLField(max_length=500)
    trailer_url = models.URLField(max_length=500, blank=True)
    genres = models.ManyToManyField(Genre, related_name='movies')
    director = models.CharField(max_length=100)
    cast = models.JSONField(default=list, help_text="List of cast members")
    tmdb_id = models.IntegerField(unique=True, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_trending = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'movies'
        ordering = ['-release_date']
    
    def __str__(self):
        return self.title


class TVShow(models.Model):
    """TV Show model for Netflix series"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    first_air_date = models.DateField()
    last_air_date = models.DateField(null=True, blank=True)
    number_of_seasons = models.IntegerField(default=1)
    number_of_episodes = models.IntegerField(default=1)
    rating = models.CharField(max_length=10, choices=[
        ('G', 'G'),
        ('PG', 'PG'),
        ('PG-13', 'PG-13'),
        ('R', 'R'),
        ('NC-17', 'NC-17'),
    ])
    poster_url = models.URLField(max_length=500)
    backdrop_url = models.URLField(max_length=500)
    trailer_url = models.URLField(max_length=500, blank=True)
    genres = models.ManyToManyField(Genre, related_name='tv_shows')
    creator = models.CharField(max_length=100)
    cast = models.JSONField(default=list, help_text="List of cast members")
    tmdb_id = models.IntegerField(unique=True, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_trending = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[
        ('ongoing', 'Ongoing'),
        ('ended', 'Ended'),
        ('cancelled', 'Cancelled'),
    ], default='ongoing')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'tv_shows'
        ordering = ['-first_air_date']
    
    def __str__(self):
        return self.title


class UserWatchlist(models.Model):
    """User's watchlist for movies and TV shows"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='watchlist')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True)
    tv_show = models.ForeignKey(TVShow, on_delete=models.CASCADE, null=True, blank=True)
    added_at = models.DateTimeField(auto_now_add=True)
    is_watched = models.BooleanField(default=False)
    watched_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'user_watchlist'
        unique_together = [
            ('user', 'movie'),
            ('user', 'tv_show'),
        ]
    
    def __str__(self):
        content = self.movie.title if self.movie else self.tv_show.title
        return f"{self.user.username} - {content}"
    
    def clean(self):
        """Ensure either movie or tv_show is set, but not both"""
        from django.core.exceptions import ValidationError
        if not self.movie and not self.tv_show:
            raise ValidationError("Either movie or tv_show must be set")
        if self.movie and self.tv_show:
            raise ValidationError("Cannot set both movie and tv_show")


class UserRating(models.Model):
    """User ratings for movies and TV shows"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ratings')
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE, null=True, blank=True)
    tv_show = models.ForeignKey(TVShow, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    review = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_ratings'
        unique_together = [
            ('user', 'movie'),
            ('user', 'tv_show'),
        ]
    
    def __str__(self):
        content = self.movie.title if self.movie else self.tv_show.title
        return f"{self.user.username} - {content} ({self.rating}/5)"
    
    def clean(self):
        """Ensure either movie or tv_show is set, but not both"""
        from django.core.exceptions import ValidationError
        if not self.movie and not self.tv_show:
            raise ValidationError("Either movie or tv_show must be set")
        if self.movie and self.tv_show:
            raise ValidationError("Cannot set both movie and tv_show")

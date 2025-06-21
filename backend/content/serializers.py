from rest_framework import serializers
from .models import Movie, TVShow, Genre, UserWatchlist, UserRating
from django.contrib.auth import get_user_model

User = get_user_model()


class GenreSerializer(serializers.ModelSerializer):
    """Serializer for Genre model"""
    class Meta:
        model = Genre
        fields = ['id', 'name', 'description']


class MovieSerializer(serializers.ModelSerializer):
    """Serializer for Movie model"""
    genres = GenreSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        write_only=True, 
        queryset=Genre.objects.all(),
        source='genres'
    )
    
    class Meta:
        model = Movie
        fields = [
            'id', 'title', 'description', 'release_date', 'duration',
            'rating', 'poster_url', 'backdrop_url', 'trailer_url',
            'genres', 'genre_ids', 'director', 'cast', 'tmdb_id',
            'is_featured', 'is_trending', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class TVShowSerializer(serializers.ModelSerializer):
    """Serializer for TVShow model"""
    genres = GenreSerializer(many=True, read_only=True)
    genre_ids = serializers.PrimaryKeyRelatedField(
        many=True, 
        write_only=True, 
        queryset=Genre.objects.all(),
        source='genres'
    )
    
    class Meta:
        model = TVShow
        fields = [
            'id', 'title', 'description', 'first_air_date', 'last_air_date',
            'number_of_seasons', 'number_of_episodes', 'rating', 'poster_url',
            'backdrop_url', 'trailer_url', 'genres', 'genre_ids', 'creator',
            'cast', 'tmdb_id', 'is_featured', 'is_trending', 'status',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class UserWatchlistSerializer(serializers.ModelSerializer):
    """Serializer for UserWatchlist model"""
    movie = MovieSerializer(read_only=True)
    tv_show = TVShowSerializer(read_only=True)
    movie_id = serializers.IntegerField(write_only=True, required=False)
    tv_show_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = UserWatchlist
        fields = [
            'id', 'user', 'movie', 'tv_show', 'movie_id', 'tv_show_id',
            'added_at', 'is_watched', 'watched_at'
        ]
        read_only_fields = ['id', 'user', 'added_at']
    
    def validate(self, attrs):
        if not attrs.get('movie_id') and not attrs.get('tv_show_id'):
            raise serializers.ValidationError("Either movie_id or tv_show_id must be provided")
        if attrs.get('movie_id') and attrs.get('tv_show_id'):
            raise serializers.ValidationError("Cannot provide both movie_id and tv_show_id")
        return attrs
    
    def create(self, validated_data):
        movie_id = validated_data.pop('movie_id', None)
        tv_show_id = validated_data.pop('tv_show_id', None)
        
        if movie_id:
            validated_data['movie_id'] = movie_id
        if tv_show_id:
            validated_data['tv_show_id'] = tv_show_id
        
        return super().create(validated_data)


class UserRatingSerializer(serializers.ModelSerializer):
    """Serializer for UserRating model"""
    movie = MovieSerializer(read_only=True)
    tv_show = TVShowSerializer(read_only=True)
    movie_id = serializers.IntegerField(write_only=True, required=False)
    tv_show_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = UserRating
        fields = [
            'id', 'user', 'movie', 'tv_show', 'movie_id', 'tv_show_id',
            'rating', 'review', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
    
    def validate(self, attrs):
        if not attrs.get('movie_id') and not attrs.get('tv_show_id'):
            raise serializers.ValidationError("Either movie_id or tv_show_id must be provided")
        if attrs.get('movie_id') and attrs.get('tv_show_id'):
            raise serializers.ValidationError("Cannot provide both movie_id and tv_show_id")
        return attrs
    
    def create(self, validated_data):
        movie_id = validated_data.pop('movie_id', None)
        tv_show_id = validated_data.pop('tv_show_id', None)
        
        if movie_id:
            validated_data['movie_id'] = movie_id
        if tv_show_id:
            validated_data['tv_show_id'] = tv_show_id
        
        return super().create(validated_data)


class ContentSearchSerializer(serializers.Serializer):
    """Serializer for content search"""
    query = serializers.CharField(max_length=200)
    content_type = serializers.ChoiceField(choices=[('movie', 'Movie'), ('tv_show', 'TV Show')], required=False)
    genre = serializers.CharField(max_length=50, required=False)
    year = serializers.IntegerField(required=False)
    page = serializers.IntegerField(min_value=1, default=1)
    page_size = serializers.IntegerField(min_value=1, max_value=50, default=20)


class ContentRecommendationSerializer(serializers.Serializer):
    """Serializer for content recommendations"""
    content_type = serializers.ChoiceField(choices=[('movie', 'Movie'), ('tv_show', 'TV Show')], required=False)
    genre = serializers.CharField(max_length=50, required=False)
    limit = serializers.IntegerField(min_value=1, max_value=50, default=10) 
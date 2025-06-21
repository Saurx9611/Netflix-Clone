from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin interface for User model"""
    list_display = [
        'username', 'email', 'first_name', 'last_name', 'full_name',
        'subscription_plan', 'is_active_subscription', 'is_active', 'date_joined'
    ]
    list_filter = [
        'subscription_plan', 'is_active_subscription', 'is_active', 'is_staff',
        'date_joined', 'created_at'
    ]
    search_fields = ['username', 'email', 'first_name', 'last_name', 'google_id']
    readonly_fields = ['created_at', 'updated_at', 'last_login', 'date_joined']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {
            'fields': (
                'first_name', 'last_name', 'email', 'profile_picture',
                'bio', 'date_of_birth', 'phone_number'
            )
        }),
        ('Google OAuth', {
            'fields': ('google_id',),
            'classes': ('collapse',)
        }),
        ('Netflix Settings', {
            'fields': ('subscription_plan', 'is_active_subscription'),
            'classes': ('collapse',)
        }),
        ('Permissions', {
            'fields': (
                'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'
            ),
            'classes': ('collapse',)
        }),
        ('Important dates', {
            'fields': ('last_login', 'date_joined', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    
    ordering = ['-date_joined']

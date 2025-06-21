import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/accounts/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          const { access } = response.data;
          localStorage.setItem("access_token", access);

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, redirect to login
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
  }) => {
    const response = await api.post("/accounts/register/", userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post("/accounts/login/", credentials);
    return response.data;
  },

  googleOAuth: async (accessToken: string) => {
    const response = await api.post("/accounts/google-oauth/", {
      access_token: accessToken,
    });
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      await api.post("/accounts/logout/", { refresh_token: refreshToken });
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },

  getProfile: async () => {
    const response = await api.get("/accounts/profile/");
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.put("/accounts/profile/", profileData);
    return response.data;
  },

  changePassword: async (passwordData: {
    old_password: string;
    new_password: string;
    new_password_confirm: string;
  }) => {
    const response = await api.post("/accounts/change-password/", passwordData);
    return response.data;
  },
};

// Content API
export const contentAPI = {
  // Genres
  getGenres: async () => {
    const response = await api.get("/content/genres/");
    return response.data;
  },

  // Movies
  getMovies: async (params?: {
    search?: string;
    genre?: string;
    year?: number;
    is_featured?: boolean;
    is_trending?: boolean;
    page?: number;
  }) => {
    const response = await api.get("/content/movies/", { params });
    return response.data;
  },

  getMovie: async (id: number) => {
    const response = await api.get(`/content/movies/${id}/`);
    return response.data;
  },

  // TV Shows
  getTVShows: async (params?: {
    search?: string;
    genre?: string;
    year?: number;
    is_featured?: boolean;
    is_trending?: boolean;
    status?: string;
    page?: number;
  }) => {
    const response = await api.get("/content/tv-shows/", { params });
    return response.data;
  },

  getTVShow: async (id: number) => {
    const response = await api.get(`/content/tv-shows/${id}/`);
    return response.data;
  },

  // Featured and trending content
  getFeaturedContent: async () => {
    const response = await api.get("/content/featured/");
    return response.data;
  },

  getNewReleases: async () => {
    const response = await api.get("/content/new-releases/");
    return response.data;
  },

  getTrendingContent: async () => {
    const response = await api.get("/content/trending/");
    return response.data;
  },

  // Search
  searchContent: async (searchData: {
    query: string;
    content_type?: "movie" | "tv_show";
    genre?: string;
    year?: number;
    page?: number;
    page_size?: number;
  }) => {
    const response = await api.post("/content/search/", searchData);
    return response.data;
  },

  // Recommendations
  getRecommendations: async (params?: {
    content_type?: "movie" | "tv_show";
    genre?: string;
    limit?: number;
  }) => {
    const response = await api.post("/content/recommendations/", params);
    return response.data;
  },

  // Watchlist
  getWatchlist: async () => {
    const response = await api.get("/content/watchlist/");
    return response.data;
  },

  addToWatchlist: async (data: { movie_id?: number; tv_show_id?: number }) => {
    const response = await api.post("/content/watchlist/", data);
    return response.data;
  },

  updateWatchlistItem: async (id: number, data: { is_watched?: boolean }) => {
    const response = await api.put(`/content/watchlist/${id}/`, data);
    return response.data;
  },

  removeFromWatchlist: async (id: number) => {
    const response = await api.delete(`/content/watchlist/${id}/`);
    return response.data;
  },

  // Ratings
  getRatings: async () => {
    const response = await api.get("/content/ratings/");
    return response.data;
  },

  addRating: async (data: {
    movie_id?: number;
    tv_show_id?: number;
    rating: number;
    review?: string;
  }) => {
    const response = await api.post("/content/ratings/", data);
    return response.data;
  },

  updateRating: async (
    id: number,
    data: { rating: number; review?: string }
  ) => {
    const response = await api.put(`/content/ratings/${id}/`, data);
    return response.data;
  },

  deleteRating: async (id: number) => {
    const response = await api.delete(`/content/ratings/${id}/`);
    return response.data;
  },
};

// Auth utilities
export const authUtils = {
  setTokens: (tokens: { access: string; refresh: string }) => {
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
  },

  setUser: (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  clearAuth: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },
};

export default api;

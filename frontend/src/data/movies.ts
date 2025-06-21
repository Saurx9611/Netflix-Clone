export interface Movie {
  id: number;
  title: string;
  image: string;
  genre: string;
  year: string;
  rating?: string;
  duration?: string;
  description?: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    genre: "Sci-Fi",
    year: "2010",
    rating: "PG-13",
    duration: "2h 28m",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 2,
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    genre: "Action",
    year: "2008",
    rating: "PG-13",
    duration: "2h 32m",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 3,
    title: "Pulp Fiction",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    genre: "Crime",
    year: "1994",
    rating: "R",
    duration: "2h 34m",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  },
  {
    id: 4,
    title: "The Shawshank Redemption",
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    genre: "Drama",
    year: "1994",
    rating: "R",
    duration: "2h 22m",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    id: 5,
    title: "Fight Club",
    image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    genre: "Drama",
    year: "1999",
    rating: "R",
    duration: "2h 19m",
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
  },
  {
    id: 6,
    title: "The Matrix",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    genre: "Sci-Fi",
    year: "1999",
    rating: "R",
    duration: "2h 16m",
    description:
      "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
  },
  {
    id: 7,
    title: "Goodfellas",
    image: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    genre: "Crime",
    year: "1990",
    rating: "R",
    duration: "2h 26m",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
  },
  {
    id: 8,
    title: "The Silence of the Lambs",
    image: "https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
    genre: "Thriller",
    year: "1991",
    rating: "R",
    duration: "1h 58m",
    description:
      "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
  },
  {
    id: 9,
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    genre: "Sci-Fi",
    year: "2014",
    rating: "PG-13",
    duration: "2h 49m",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 10,
    title: "The Godfather",
    image: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    genre: "Crime",
    year: "1972",
    rating: "R",
    duration: "2h 55m",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  },
];

export const getMoviesByGenre = (genre: string) => {
  return movies.filter((movie) => movie.genre === genre);
};

export const getPopularMovies = () => {
  return movies.slice(0, 8);
};

export const getMoviesByYear = (year: string) => {
  return movies.filter((movie) => movie.year === year);
};

export const getMoviesByDecade = (decade: string) => {
  const startYear = parseInt(decade);
  const endYear = startYear + 9;
  return movies.filter((movie) => {
    const movieYear = parseInt(movie.year);
    return movieYear >= startYear && movieYear <= endYear;
  });
};

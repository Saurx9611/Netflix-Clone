export interface MovieDetail {
  id: number;
  title: string;
  image: string;
  backdrop: string;
  genre: string;
  year: string;
  rating: string;
  duration: string;
  director: string;
  cast: string[];
  description: string;
  similar: {
    id: number;
    title: string;
    image: string;
  }[];
}

export const movieDetails: Record<number, MovieDetail> = {
  1: {
    id: 1,
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    genre: "Sci-Fi",
    year: "2010",
    rating: "PG-13",
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Ellen Page",
      "Tom Hardy",
      "Ken Watanabe",
    ],
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    similar: [
      {
        id: 6,
        title: "The Matrix",
        image:
          "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      },
      {
        id: 9,
        title: "Interstellar",
        image:
          "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
      },
      {
        id: 15,
        title: "Blade Runner 2049",
        image:
          "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
      },
    ],
  },
  2: {
    id: 2,
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    genre: "Action",
    year: "2008",
    rating: "PG-13",
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: [
      "Christian Bale",
      "Heath Ledger",
      "Aaron Eckhart",
      "Maggie Gyllenhaal",
      "Gary Oldman",
    ],
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    similar: [
      {
        id: 16,
        title: "Batman Begins",
        image:
          "https://image.tmdb.org/t/p/w500/8RW2runSEc34IwKN2D1aPcJqd2X.jpg",
      },
      {
        id: 17,
        title: "The Dark Knight Rises",
        image:
          "https://image.tmdb.org/t/p/w500/85cWkCVftiVs0BVey6pxX8uNmLt.jpg",
      },
      {
        id: 18,
        title: "Joker",
        image:
          "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
      },
    ],
  },
  3: {
    id: 3,
    title: "Pulp Fiction",
    image: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2QM528GluxMcE.jpg",
    genre: "Crime",
    year: "1994",
    rating: "R",
    duration: "2h 34m",
    director: "Quentin Tarantino",
    cast: [
      "John Travolta",
      "Samuel L. Jackson",
      "Uma Thurman",
      "Bruce Willis",
      "Ving Rhames",
    ],
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    similar: [
      {
        id: 7,
        title: "Goodfellas",
        image:
          "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
      },
      {
        id: 10,
        title: "The Godfather",
        image:
          "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
      },
      {
        id: 19,
        title: "Reservoir Dogs",
        image:
          "https://image.tmdb.org/t/p/w500/xi8Iu6qyTfyZVDVy60raIOYq5hN.jpg",
      },
    ],
  },
  4: {
    id: 4,
    title: "The Shawshank Redemption",
    image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    genre: "Drama",
    year: "1994",
    rating: "R",
    duration: "2h 22m",
    director: "Frank Darabont",
    cast: [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton",
      "William Sadler",
      "Clancy Brown",
    ],
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    similar: [
      {
        id: 5,
        title: "Fight Club",
        image:
          "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
      },
      {
        id: 20,
        title: "The Green Mile",
        image:
          "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
      },
      {
        id: 21,
        title: "Forrest Gump",
        image:
          "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
      },
    ],
  },
  5: {
    id: 5,
    title: "Fight Club",
    image: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop:
      "https://image.tmdb.org/t/p/original/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    genre: "Drama",
    year: "1999",
    rating: "R",
    duration: "2h 19m",
    director: "David Fincher",
    cast: [
      "Brad Pitt",
      "Edward Norton",
      "Helena Bonham Carter",
      "Meat Loaf",
      "Jared Leto",
    ],
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    similar: [
      {
        id: 4,
        title: "The Shawshank Redemption",
        image:
          "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
      },
      {
        id: 22,
        title: "Se7en",
        image:
          "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik6EngKJjVWO0o.jpg",
      },
      {
        id: 23,
        title: "American Psycho",
        image:
          "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61L8kuCv9fkhq.jpg",
      },
    ],
  },
};

export const getMovieDetail = (id: number): MovieDetail | null => {
  return movieDetails[id] || null;
};

export const getAllMovieDetails = () => {
  return Object.values(movieDetails);
};

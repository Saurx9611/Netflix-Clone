export interface TVShow {
  id: number;
  title: string;
  image: string;
  genre: string;
  year?: string;
  description?: string;
}

export const tvShows: TVShow[] = [
  {
    id: 1,
    title: "Stranger Things",
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    genre: "Sci-Fi",
    year: "2016",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  },
  {
    id: 2,
    title: "Money Heist",
    image: "https://image.tmdb.org/t/p/w500/ab8G9J0i2hJpZ4r3pGqF0b0Z0lG.jpg",
    genre: "Crime",
    year: "2017",
    description:
      "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
  },
  {
    id: 3,
    title: "The Witcher",
    image: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    genre: "Fantasy",
    year: "2019",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
  },
  {
    id: 4,
    title: "Breaking Bad",
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    genre: "Drama",
    year: "2008",
    description:
      "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future.",
  },
  {
    id: 5,
    title: "Dark",
    image: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg",
    genre: "Thriller",
    year: "2017",
    description:
      "A missing child sets four families on a frantic hunt for answers as they unearth a mind-bending mystery that spans three generations.",
  },
  {
    id: 6,
    title: "The Crown",
    image: "https://image.tmdb.org/t/p/w500/7k9s1cHd7TqDjnQfCj0P4h2jqOg.jpg",
    genre: "Drama",
    year: "2016",
    description:
      "The story of Queen Elizabeth II and the events that shaped the second half of the twentieth century.",
  },
  {
    id: 7,
    title: "Wednesday",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    genre: "Comedy",
    year: "2022",
    description:
      "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
  },
  {
    id: 8,
    title: "The Last of Us",
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    genre: "Drama",
    year: "2023",
    description:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
  },
  {
    id: 9,
    title: "House of the Dragon",
    image: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    genre: "Fantasy",
    year: "2022",
    description:
      "The story of House Targaryen set 200 years before the events of Game of Thrones.",
  },
  {
    id: 10,
    title: "Better Call Saul",
    image: "https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
    genre: "Crime",
    year: "2015",
    description:
      "The trials and tribulations of criminal lawyer Jimmy McGill in the years leading up to his fateful run-in with Walter White and Jesse Pinkman.",
  },
];

export const getTVShowsByGenre = (genre: string): TVShow[] => {
  return tvShows.filter((show) => show.genre === genre);
};

export const getPopularTVShows = (): TVShow[] => {
  return tvShows.slice(0, 6);
};

export const getTrendingTVShows = (): TVShow[] => {
  return tvShows.slice(0, 4);
};

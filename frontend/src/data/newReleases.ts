export interface NewRelease {
  id: number;
  title: string;
  image: string;
  type: "Movie" | "TV Show";
  year: string;
  isNew: boolean;
  trending?: boolean;
  description?: string;
}

export const newReleases: NewRelease[] = [
  {
    id: 1,
    title: "Wednesday",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    type: "TV Show",
    year: "2022",
    isNew: true,
    description:
      "Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends at Nevermore Academy.",
  },
  {
    id: 2,
    title: "The Last of Us",
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    type: "TV Show",
    year: "2023",
    isNew: true,
    description:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
  },
  {
    id: 3,
    title: "Oppenheimer",
    image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    type: "Movie",
    year: "2023",
    isNew: true,
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  },
  {
    id: 4,
    title: "Barbie",
    image: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    type: "Movie",
    year: "2023",
    isNew: true,
    description:
      "Barbie suffers a crisis that leads her to question her world and her existence.",
  },
  {
    id: 5,
    title: "House of the Dragon",
    image: "https://image.tmdb.org/t/p/w500/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    type: "TV Show",
    year: "2022",
    isNew: false,
    description:
      "The story of House Targaryen set 200 years before the events of Game of Thrones.",
  },
  {
    id: 6,
    title: "Top Gun: Maverick",
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    type: "Movie",
    year: "2022",
    isNew: false,
    description:
      "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission.",
  },
  {
    id: 7,
    title: "The Bear",
    image: "https://image.tmdb.org/t/p/w500/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg",
    type: "TV Show",
    year: "2022",
    isNew: true,
    description:
      "A young chef from the fine dining world returns to Chicago to run his family's Italian beef sandwich shop.",
  },
  {
    id: 8,
    title: "Everything Everywhere All at Once",
    image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    type: "Movie",
    year: "2022",
    isNew: true,
    description:
      "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save what's important to her by connecting with the lives she could have led in other universes.",
  },
];

export const trendingContent: NewRelease[] = [
  {
    id: 9,
    title: "Stranger Things",
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    type: "TV Show",
    year: "2016",
    isNew: false,
    trending: true,
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  },
  {
    id: 10,
    title: "Money Heist",
    image: "https://image.tmdb.org/t/p/w500/ab8G9J0i2hJpZ4r3pGqF0b0Z0lG.jpg",
    type: "TV Show",
    year: "2017",
    isNew: false,
    trending: true,
    description:
      "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
  },
  {
    id: 11,
    title: "The Witcher",
    image: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    type: "TV Show",
    year: "2019",
    isNew: false,
    trending: true,
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
  },
  {
    id: 12,
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    type: "Movie",
    year: "2010",
    isNew: false,
    trending: true,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 13,
    title: "Breaking Bad",
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    type: "TV Show",
    year: "2008",
    isNew: false,
    trending: true,
    description:
      "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future.",
  },
  {
    id: 14,
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    type: "Movie",
    year: "2008",
    isNew: false,
    trending: true,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
];

export const getNewReleases = () => {
  return newReleases.filter((item) => item.isNew);
};

export const getTrendingContent = () => {
  return trendingContent.filter((item) => item.trending);
};

export const getComingSoon = () => {
  return newReleases.slice(0, 4);
};

export const getRecentlyAdded = () => {
  return newReleases.slice(2, 6);
};

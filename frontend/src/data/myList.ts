export interface MyListItem {
  id: number;
  title: string;
  image: string;
  type: "Movie" | "TV Show";
  year: string;
  addedDate: string;
  genre?: string;
  description?: string;
}

export const myList: MyListItem[] = [
  {
    id: 1,
    title: "Stranger Things",
    image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    type: "TV Show",
    year: "2016",
    addedDate: "2024-01-15",
    genre: "Sci-Fi",
    description:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  },
  {
    id: 2,
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    type: "Movie",
    year: "2010",
    addedDate: "2024-01-10",
    genre: "Sci-Fi",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  },
  {
    id: 3,
    title: "The Witcher",
    image: "https://image.tmdb.org/t/p/w500/zrPpUlehQaBf8YX2NrVrKK8IEpf.jpg",
    type: "TV Show",
    year: "2019",
    addedDate: "2024-01-05",
    genre: "Fantasy",
    description:
      "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.",
  },
  {
    id: 4,
    title: "Breaking Bad",
    image: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    type: "TV Show",
    year: "2008",
    addedDate: "2024-01-03",
    genre: "Drama",
    description:
      "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student to secure his family's financial future.",
  },
  {
    id: 5,
    title: "The Dark Knight",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    type: "Movie",
    year: "2008",
    addedDate: "2024-01-01",
    genre: "Action",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  },
  {
    id: 6,
    title: "Money Heist",
    image: "https://image.tmdb.org/t/p/w500/ab8G9J0i2hJpZ4r3pGqF0b0Z0lG.jpg",
    type: "TV Show",
    year: "2017",
    addedDate: "2023-12-28",
    genre: "Crime",
    description:
      "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
  },
];

export const getMyList = () => {
  return myList;
};

export const getMyListByType = (type: "Movie" | "TV Show") => {
  return myList.filter((item) => item.type === type);
};

export const getMyListByGenre = (genre: string) => {
  return myList.filter((item) => item.genre === genre);
};

export const addToMyList = (item: Omit<MyListItem, "id" | "addedDate">) => {
  const newItem: MyListItem = {
    ...item,
    id: Math.max(...myList.map((item) => item.id)) + 1,
    addedDate: new Date().toISOString().split("T")[0],
  };
  myList.push(newItem);
  return newItem;
};

export const removeFromMyList = (id: number) => {
  const index = myList.findIndex((item) => item.id === id);
  if (index > -1) {
    myList.splice(index, 1);
    return true;
  }
  return false;
};

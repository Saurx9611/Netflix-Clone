import Image from "next/image";
import {
  movies,
  getMoviesByGenre,
  getPopularMovies,
  getMoviesByDecade,
} from "@/data/movies";

function MovieCarousel({
  title,
  movies,
}: {
  title: string;
  movies: typeof movies;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 px-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[180px] max-w-[180px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              width={180}
              height={270}
              className="object-cover w-full h-[270px]"
            />
            <div className="p-2">
              <h3 className="text-white text-base font-semibold truncate">
                {movie.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-400 text-sm">{movie.genre}</p>
                <p className="text-gray-400 text-sm">{movie.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MoviesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
      <h1 className="text-4xl font-bold text-white mb-8">Movies</h1>

      <MovieCarousel title="Popular Movies" movies={getPopularMovies()} />
      <MovieCarousel
        title="Action & Adventure"
        movies={getMoviesByGenre("Action")}
      />
      <MovieCarousel
        title="Sci-Fi Classics"
        movies={getMoviesByGenre("Sci-Fi")}
      />
      <MovieCarousel title="Drama" movies={getMoviesByGenre("Drama")} />
      <MovieCarousel
        title="Crime & Thriller"
        movies={getMoviesByGenre("Crime").concat(getMoviesByGenre("Thriller"))}
      />
      <MovieCarousel title="90s Classics" movies={getMoviesByDecade("1990")} />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getPopularTVShows } from "@/data/tvShows";

function Hero() {
  return (
    <section
      className="relative h-[60vh] w-full flex items-end justify-start bg-cover bg-center rounded-lg overflow-hidden mb-8"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      <div className="relative z-10 p-8 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          Stranger Things
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow">
          When a young boy vanishes, a small town uncovers a mystery involving
          secret experiments, terrifying supernatural forces and one strange
          little girl.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-gray-200 transition">
            Play
          </button>
          <button className="bg-gray-700/80 text-white font-bold px-6 py-2 rounded hover:bg-gray-600 transition">
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

function MovieCarousel() {
  const popularShows = getPopularTVShows();

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-2">
        Popular on Netflix
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2 px-2">
        {popularShows.map((show) => (
          <Link key={show.id} href={`/movie/${show.id}`}>
            <div className="min-w-[180px] max-w-[180px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer">
              <Image
                src={show.image}
                alt={show.title}
                width={180}
                height={270}
                className="object-cover w-full h-[270px]"
              />
              <div className="p-2">
                <h3 className="text-white text-base font-semibold truncate">
                  {show.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12">
      <Hero />
      <MovieCarousel />
    </div>
  );
}

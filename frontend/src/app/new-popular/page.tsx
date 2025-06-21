import Image from "next/image";
import {
  newReleases,
  trendingContent,
  getNewReleases,
  getTrendingContent,
  getComingSoon,
  getRecentlyAdded,
} from "@/data/newReleases";

function ContentCarousel({
  title,
  content,
}: {
  title: string;
  content: any[];
}) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-2">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 px-2">
        {content.map((item) => (
          <div
            key={item.id}
            className="min-w-[180px] max-w-[180px] bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer relative"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={180}
              height={270}
              className="object-cover w-full h-[270px]"
            />
            {item.isNew && (
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded font-bold">
                NEW
              </div>
            )}
            {item.trending && (
              <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold">
                TRENDING
              </div>
            )}
            <div className="p-2">
              <h3 className="text-white text-base font-semibold truncate">
                {item.title}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-400 text-sm">{item.type}</p>
                <p className="text-gray-400 text-sm">{item.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function NewPopularPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-12 pt-8">
      <h1 className="text-4xl font-bold text-white mb-8">New & Popular</h1>

      <ContentCarousel title="New Releases" content={getNewReleases()} />
      <ContentCarousel title="Trending Now" content={getTrendingContent()} />
      <ContentCarousel title="Coming Soon" content={getComingSoon()} />
      <ContentCarousel title="Recently Added" content={getRecentlyAdded()} />
    </div>
  );
}

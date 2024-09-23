import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Info, Loader, Play } from "lucide-react";
import { useGetTrendingMoviesQuery } from "../../redux/api/movieApiSlice";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { useGetTrendingTvQuery } from "../../redux/api/tvApiSlice";
import { useSelector } from "react-redux";
import MovieSlider from "../../components/MovieSlider";
import TvSlider from "../../components/TvSlider";

export default function HomeScreen() {
  const { type } = useSelector((state) => state.contentType);

  const { data: trendingMovies, isLoading: loadingTrendingMovies } =
    useGetTrendingMoviesQuery();
  const { data: trendingTv, isLoading: loadingTrendingTv } =
    useGetTrendingTvQuery();

  if (loadingTrendingMovies || loadingTrendingTv) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  const imageUrl =
    type === "Movies"
      ? trendingMovies?.content?.backdrop_path
      : trendingTv?.content?.backdrop_path;

  return (
    <>
      <div className="relative h-screen text-white ">
        <Navbar />
        <img
          src={ORIGINAL_IMG_BASE_URL + imageUrl}
          alt="hero image"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10" />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-3xl sm:text-6xl font-extrabold text-balance">
              {type === "Movies"
                ? trendingMovies?.content?.original_title
                : trendingTv?.content?.original_name}
            </h1>
            <p className="mt-2 text-lg">
              {type === "Movies"
                ? trendingMovies?.content?.release_date.split("-")[0]
                : trendingTv?.content?.first_air_date.split("-")[0]}
              | {trendingMovies?.adult || trendingTv?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg">
              {type === "Movies"
                ? trendingMovies?.content?.overview
                : trendingTv?.content?.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${
                type === "Movies"
                  ? trendingMovies?.content?.id
                  : trendingTv?.content?.id
              }`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Play
            </Link>
            <Link
              to={`/watch/${
                type === "Movies"
                  ? trendingMovies?.content?.id
                  : trendingTv?.content?.id
              }`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {type === "Movies"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <TvSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
}

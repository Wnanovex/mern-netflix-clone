import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  useGetSimilarTvsQuery,
  useGetTvDetailsQuery,
  useGetTvTrailersQuery,
} from "../redux/api/tvApiSlice";
import {
  useGetMovieDetailsQuery,
  useGetMovieTrailersQuery,
  useGetSimilarMoviesQuery,
} from "../redux/api/movieApiSlice";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchSkeleton from "../components/WatchSkeleton";

export default function WatchPage() {
  const { id } = useParams();
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const sliderRef = useRef(null);
  const { userInfo } = useSelector((state) => state.auth);
  const { type } = useSelector((state) => state.contentType);
  if (!userInfo) <Navigate to={"/login"} />;

  const { data: movieTrailers, isLoading: loadingMovieTrailers } =
    useGetMovieTrailersQuery(id);
  const { data: movieDetails, isLoading: loadingMovieDetails } =
    useGetMovieDetailsQuery(id);
  const { data: SimilarMovies, isLoading: loadingSimilarMovies } =
    useGetSimilarMoviesQuery(id);

  const { data: tvTrailers, isLoading: loadingTvTrailers } =
    useGetTvTrailersQuery(id);
  const { data: tvDetails, isLoading: loadingTvDetails } =
    useGetTvDetailsQuery(id);
  const { data: SimilarTvs, isLoading: loadingSimilarTvs } =
    useGetSimilarTvsQuery(id);

  const handleNext = () => {
    if (
      currentTrailerIdx < movieTrailers?.trailers.length - 1 ||
      currentTrailerIdx < tvTrailers?.trailers.length - 1
    )
      setCurrentTrailerIdx(currentTrailerIdx + 1);
  };

  const handlePrev = () => {
    if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const posterPath =
    movieDetails?.movie?.poster_path || tvDetails?.tv?.poster_path;
  const youtubeUrl =
    movieTrailers?.trailers[currentTrailerIdx]?.key ||
    tvTrailers?.trailers[currentTrailerIdx]?.key;
  const trailersLength =
    tvTrailers?.trailers.length > 0 || movieTrailers?.trailers.length > 0;
  const similarLength =
    SimilarMovies?.similar.length > 0 || SimilarTvs?.similar.length > 0;
  const trailersLengthZero =
    movieTrailers?.trailers.length === 0 || tvTrailers?.trailers.length === 0;
  const similarContent = SimilarMovies?.similar || SimilarTvs?.similar;
  const currentTrailerIdxContentLengthMinus1 =
    currentTrailerIdx === movieTrailers?.trailers.length - 1 ||
    currentTrailerIdx === tvTrailers?.trailers.length - 1;

  if (
    loadingMovieTrailers ||
    loadingMovieDetails ||
    loadingSimilarMovies ||
    loadingTvTrailers ||
    loadingTvDetails ||
    loadingSimilarTvs
  ) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchSkeleton />
      </div>
    );
  }

  if (
    (!tvDetails && type === "TV Shows") ||
    (!movieDetails && type === "Movies")
  ) {
    return (
      <div className="h-screen bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 h-full">
        <Navbar />

        {trailersLength && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`rounded px-4 py-2 bg-gray-500/70 hover:bg-gray-500 text-white ${
                currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className={`rounded px-4 py-2 bg-gray-500/70 hover:bg-gray-500 text-white ${
                currentTrailerIdxContentLengthMinus1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={currentTrailerIdxContentLengthMinus1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailersLength && (
            <ReactPlayer
              controls={true}
              width={"100%"}
              height={"70vh"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${youtubeUrl}`}
            />
          )}

          {trailersLengthZero && (
            <h2 className="text-xl text-center mt-5">
              No trailers available for{" "}
              <span className="font-bold text-red-600">
                {movieDetails?.movie?.title || tvDetails?.tv?.name}
              </span>
            </h2>
          )}
        </div>

        {/* movie details */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {movieDetails?.movie?.title || tvDetails?.tv?.name}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(
                movieDetails?.movie?.release_date ||
                  tvDetails?.tv?.first_air_date
              )}
              {" | "}
              {movieDetails?.movie?.adult || tvDetails?.tv?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-xl text-gray-400">
              {movieDetails?.movie?.overview || tvDetails?.tv?.overview}
            </p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + posterPath}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>

        {/* similar movies */}

        {similarLength && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Movies/Tv Shows</h3>
            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    to={`/watch/${content.id}`}
                    key={content.id}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content?.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content?.title || content?.name}
                    </h4>
                  </Link>
                );
              })}
              <button
                className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full opacity-0 group-hover:opacity-100 bg-red-600 text-white z-10"
                onClick={scrollLeft}
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full opacity-0 group-hover:opacity-100 bg-red-600 text-white z-10"
                onClick={scrollRight}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

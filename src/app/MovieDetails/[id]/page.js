import Header from "@/app/_features/Header";
import { MovieCard } from "@/app/_components/MovieCard";

const MovieDetails = () => {
  const movieDetailsLimit = 5;
  return (
    <div>
      <Header />
      <div id="Every-content" className="flex flex- col pl-[80px] pr-[80px]">
        <div id="Info about the movie"></div>
        <div id="Movie poster and trailer"></div>
        <div id="Badges about the movie"></div>
        <div id="Movie-cast"></div>
        <div className="grid grid-cols-5 gap-x-8 gap-y-7 ">
          {movieData.slice(0, movieDetailsLimit).map((movie, index) => {
            return (
              <MovieCard
                key={index}
                movieName={movie.title}
                score={movie.vote_average.toFixed(1)}
                imageURL={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

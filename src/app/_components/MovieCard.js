import GoldenStar from "./_icons/GoldenStar";
import { useRouter } from "next/navigation";
import { getPosterUrl } from "@/lib/tmdb";
export const MovieCard = ({ movieName, imageURL, score, movieId, compact = false }) => {
  const router = useRouter();
  const handleMovieDetails = () => {
    if (!movieId) return;
    router.push(`/MovieDetails/${movieId}`);
  };

  const safeImageUrl = imageURL || getPosterUrl(null);
  const outerSizeClass = compact
    ? "w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px] h-[300px] sm:h-[320px] md:h-[330px]"
    : "w-full max-w-[156px] sm:max-w-[190px] md:max-w-[210px] lg:max-w-[230px] h-[320px] sm:h-[372px] md:h-[404px] lg:h-[439px]";
  const imageSizeClass = compact
    ? "w-full h-[228px] sm:h-[250px] md:h-[270px]"
    : "w-full h-[236px] sm:h-[276px] md:h-[305px] lg:h-[340px]";
  const titleClass = compact
    ? "text-[16px] md:text-[18px] h-[44px]"
    : "text-[16px] md:text-[18px] h-[50px] md:h-[56px]";
  return (
    <div
      onClick={handleMovieDetails}
      id="Outermost-Card-section"
      className={`${outerSizeClass} flex flex-col rounded-lg overflow-hidden cursor-pointer`}
    >
      <div
        id="Image-Section"
        className={`hover:brightness-75 duration-300 ${imageSizeClass} bg-[#E4E4E7] dark:bg-[#27272A]`}
      >
        {safeImageUrl ? (
          <img
            src={safeImageUrl}
            alt={movieName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-[#71717A]">
            No image
          </div>
        )}
      </div>
      <div
        id="Description-Section"
        className="w-full bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col p-2"
      >
        <div
          id="Voting-Score-Section"
          className="flex gap-[5.33px] items-center h-[23px]"
        >
          <GoldenStar className="text-[#FDE047] dark:text-[#FAFAFA]" />
          <div
            id="Score"
            className="text-[#09090B] dark:text-[#FAFAFA] text-[14px]"
          >
            {score || "0.0"}
            <span className="text-[12px] text-[#71717a]">/10</span>
          </div>
        </div>
        <div
          id="Movie-Name"
          className={`text-[#09090B] dark:text-[#FAFAFA] ${titleClass} line-clamp-2`}
        >
          {movieName}
        </div>
      </div>
    </div>
  );
};

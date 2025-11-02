import GoldenStar from "./_icons/GoldenStar";
export const MovieCard = ({ movieName, imageURL, score }) => {
  return (
    <div
      id="Outermost-Card-section"
      className="w-[229.73px] h-[439px] flex flex-col rounded-lg overflow-hidden"
    >
      <div
        id="Image-Section"
        className="hover:brightness-75 duration-400 w-[229.73px] h-[340px]  bg-[#F4F4F5] dark:bg-[#27272A] cursor-pointer"
      >
        <img src={imageURL} alt={movieName} />
      </div>
      <div
        id="Description-Section"
        className="w-full bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col p-[8] "
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
            {" "}
            {score}
            <span className="text-[12px] text-[#71717a]">/10</span>
          </div>
        </div>
        <div
          id="Movie-Name"
          className="text-[#09090B] dark:text-[#FAFAFA] text-[18px] h-[56px]"
        >
          {movieName}
        </div>
      </div>
    </div>
  );
};

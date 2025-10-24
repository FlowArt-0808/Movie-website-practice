import GoldenStar from "./_icons/GoldenStar";
const MovieCard = () => {
  return (
    <div
      id="Outermost-Card-section"
      className="w-[229.73px] h-[95px] flex flex-col rounded-lg"
    >
      <div
        id="Image-Section"
        className="w-[229.73px] h-[340px] rounded-lg"
      ></div>
      <div
        id="Description-Section"
        className="w-full rounded-lg h-[95px] bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col p-[8]"
      >
        <div
          id="Voting-Score-Section"
          className="flex gap-[5.33px] items-center"
        >
          <GoldenStar className="dark:stroke-[#FAFAFA] dark:fill-[#FAFAFA] stroke-[##FDE047] fill-[##FDE047]" />
          <div
            id="Score"
            className="text-[#09090B] dark:text-[#FAFAFA] text-[14px]"
          >
            <span className="text-[12px] text-[#71717a]">/10</span>
          </div>
        </div>
        <div
          id="Movie-Name"
          className="text-[#09090B] dark:text-[#FAFAFA] text-[18px]"
        ></div>
      </div>
    </div>
  );
};

export default MovieCard;

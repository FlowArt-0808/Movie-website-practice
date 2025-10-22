import GoldenStar from "./_icons/GoldenStar";
const MovieCard = () => {
  return (
    <div
      id="Outermost-Card-section"
      className="w-[229.73px] h-[95px] flex flex-col"
    >
      <div id="Image-Section" className="w-[229.73px] h-[340px]"></div>
      <div id="Description-Section">
        <div id="Voting-Score-Section" className="flex gap-[5.33px]">
          <GoldenStar />
          <div id="Score" className="">
            <span className="text-[12px] text-[#71717a]">/10</span>
          </div>
        </div>
        <div id="Movie-Name" className="text-[#09090B] text-[18px]"></div>
      </div>
    </div>
  );
};

export default MovieCard;

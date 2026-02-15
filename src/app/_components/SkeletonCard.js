import Skeleton from "react-loading-skeleton";

const SkeletonCard = ({ compact = false }) => {
  const outerSizeClass = compact
    ? "w-full max-w-[150px] sm:max-w-[170px] md:max-w-[190px] h-[300px] sm:h-[320px] md:h-[330px]"
    : "w-full max-w-[156px] sm:max-w-[190px] md:max-w-[210px] lg:max-w-[230px] h-[320px] sm:h-[372px] md:h-[404px] lg:h-[439px]";
  const imageSizeClass = compact
    ? "h-[228px] sm:h-[250px] md:h-[270px]"
    : "h-[236px] sm:h-[276px] md:h-[305px] lg:h-[340px]";

  return (
    <div
      className={`${outerSizeClass} flex flex-col rounded-lg overflow-hidden`}
      aria-hidden="true"
    >
      <Skeleton className={`w-full ${imageSizeClass} rounded-none`} />
      <div className="w-full bg-[#F4F4F5] dark:bg-[#27272A] flex flex-col p-2 gap-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-2/3 h-5" />
      </div>
    </div>
  );
};

export default SkeletonCard;

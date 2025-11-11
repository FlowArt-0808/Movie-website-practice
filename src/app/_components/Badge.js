import RightArrow from "./_icons/RightArrow";

const Badge = ({ genreName }) => {
  return (
    <div className=" max-w-max w-auto border-2 inline-flex pr-[4px] pl-[10px] pt-[2px] pb-[2px] font-[600] text-[12px] text-[#09090B] dark:text-[#FAFAFA] gap-[8px] border-[#E4E4E7] dark:border-[#27272A] rounded-full items-center">
      <div>{genreName}</div>
      <RightArrow />
    </div>
  );
};

export default Badge;

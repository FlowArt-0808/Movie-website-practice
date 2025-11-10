import RightArrow from "./_icons/RightArrow";

const Badge = (props) => {
  return (
    <div className="pr-[4px] pl-[10px] pt-[2px] pb-[2px] font-[600] text-[12px] text-[#09090B] dark:text-[#FAFAFA] gap-[8px] border-1 border-[#E4E4E7] dark:border-[#27272A] rounded-full">
      {" "}
      <RightArrow />{" "}
    </div>
  );
};

export default Badge;

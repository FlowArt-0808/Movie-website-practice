const Badge = ({ genreName }) => {
  return (
    <div className="max-w-max w-auto border inline-flex px-[10px] py-[3px] font-medium text-[12px] leading-[16px] text-[#09090B] dark:text-[#FAFAFA] border-[#E4E4E7] dark:border-[#27272A] rounded-full items-center bg-white dark:bg-[#09090B] hover:bg-[#F4F4F5] dark:hover:bg-[#18181B]">
      <div>{genreName}</div>
    </div>
  );
};

export default Badge;

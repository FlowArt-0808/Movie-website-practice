import BlueMovieIcon from "../_components/_icons/BlueMovieIcon";
import DarkLightMode from "../_components/_icons/DarkLightMode";
import DownArrow from "../_components/_icons/DownArrow";
import Search from "../_components/_icons/Search";

export default function Header() {
  return (
    <div id="Navigation" className="px-20 w-[1440px] mb-6">
      <div
        id="Navigation Items"
        className=" flex justify-between items-center mt-[11.5px] mb-[11.5px]"
      >
        <div
          id="Text and movie icon"
          className="gap-[9.67px] flex justify-between items-center"
        >
          <BlueMovieIcon />
          <div className="italic text-[#4338CA] text-[16px] font-[700]">
            Movie{" "}
            <span className="italic text-[#4338CA] text-[16px] font-[700]">
              Z
            </span>
          </div>
        </div>
        <div
          id="Search and Dropdown"
          className="flex justify-between items-center gap-[12px]"
        >
          <div className="flex gap-[12px] pt-2 pb-2 pr-4 pl-4 border-1 border-[#E4E4E7] items-center rounded-md">
            <DownArrow />
            <select className="" placeholder="Genre">
              <option value="option1">Yo</option>
              <option value="option2">Hello</option>
            </select>
          </div>
          <div className="flex gap-[12.13px] border-1 border-[#E4E4E7] items-center rounded-lg pr-3 pl-3">
            <Search />
            <input type="search" placeholder="Search.."></input>
          </div>
        </div>
        <button
          id="Swith Mode"
          className="pt-2 pr-4 pb-2 pl-4 border-1 rounded-md "
        >
          <DarkLightMode />
        </button>
      </div>
    </div>
  );
}

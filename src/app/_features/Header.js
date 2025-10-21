import BlueMovieIcon from "../_components/_icons/BlueMovieIcon";
import DarkLightMode from "../_components/_icons/DarkLightMode";

export default function Header() {
  return (
    <div id="Navigation" className="px-20 w-screen mb-6">
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
          className="flex justify-between items-center"
        >
          <select>
            <option value="option1">Yo</option>
            <option value="option2">Hello</option>
          </select>
          <input type="search" placeholder="Enter search terms"></input>
        </div>
        <button
          id="Swith Mode"
          className="pt-2 pr-4 pb-2 pl-4 border-1 rounded-xl "
        >
          <DarkLightMode />
        </button>
      </div>
    </div>
  );
}

import SilverMovieIcon from "../_components/_icons/SilverMovieIcon";
import Email from "../_components/_icons/Email";
import Phone from "../_components/_icons/Phone";

export default function Footer() {
  return (
    <div className=" bg-indigo-700 w-[1440px] h-[280px]">
      <div className="flex justify-between pt-[40px] pb-[40px] pl-[80px] pr-[80px]">
        <div id="Left-footer-section" className="flex flex-col gap-y-[12px] ">
          <div className="flex gap-2 items-center">
            <SilverMovieIcon />
            <div className="italic text-[#FAFAFA] text-[16px] font-[700]">
              Movie{" "}
              <span className="italic text-[#FAFAFA] text-[16px] font-[700]">
                Z
              </span>
            </div>
          </div>
          <div className="text-[#FAFAFA] text-[14px]">
            © 2024 Movie Z. All Rights Reserved.
          </div>
        </div>

        <div id="Right-footer-section" className="flex gap-[96px]">
          <div id="Contact-information" className="flex flex-col gap-[24px]">
            <div
              id="Email-information"
              className="flex items-center gap-[12px]"
            >
              <Email />
              <div className="flex flex-col text-[#FAFAFA] text-[14px]">
                <div>Email:</div>
                <div>support@movieZ.com</div>
              </div>
            </div>
            <div
              id="Phone-information"
              className="flex items-center gap-[12px]"
            >
              <Phone />
              <div className="flex flex-col text-[#FAFAFA] text-[14px]">
                <div>Phone:</div>
                <div>+976 (11) 123-4567</div>
              </div>
            </div>
          </div>
          <div
            id="Social-Media-section"
            className="flex flex-col gap-[12px] text-[#FAFAFA]"
          >
            <div>Follow us</div>
            <div className="flex gap-[12px] font-[500] ">
              <span>Facebook</span>
              <span>Instagram</span>
              <span>Twitter</span>
              <span>Youtube</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

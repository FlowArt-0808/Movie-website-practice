import SilverMovieIcon from "../_components/_icons/SilverMovieIcon";
import Email from "../_components/_icons/Email";
import Phone from "../_components/_icons/Phone";

const Footer = () => {
  return (
    <div className=" bg-indigo-700 w-full h-[280px]">
      <div className="flex justify-between pt-[40px] pb-[40px] pl-[80px] pr-[80px]">
        <div
          aria-label="Left-footer-section"
          className="flex flex-col gap-y-[12px] "
        >
          <div className="flex gap-2 items-center">
            <SilverMovieIcon />
            <p className="italic text-[#FAFAFA] text-[16px] font-[700]">
              Movie{" "}
              <span className="italic text-[#FAFAFA] text-[16px] font-[700]">
                Z
              </span>
            </p>
          </div>
          <p className="text-[#FAFAFA] text-[14px]">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        <div aria-label="Right-footer-section" className="flex gap-[96px]">
          <div
            aria-label="Contact-information"
            className="flex flex-col gap-[24px]"
          >
            <div
              aria-label="Email-information"
              className="flex items-center gap-[12px]"
            >
              <Email />
              <div className="flex flex-col text-[#FAFAFA] text-[14px]">
                <p>Email:</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div
              id="Phone-information"
              className="flex items-center gap-[12px]"
            >
              <Phone />
              <div className="flex flex-col text-[#FAFAFA] text-[14px]">
                <p>Phone:</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div
            aria-label="Social-Media-section"
            className="flex flex-col gap-[12px] text-[#FAFAFA]"
          >
            <p>Follow us</p>
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
};

export default Footer;

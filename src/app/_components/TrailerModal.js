"use client";

const TrailerModal = ({ isOpen, trailerKey, title, onClose }) => {

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-[92vw] max-w-[820px] bg-black rounded-none overflow-hidden border border-[#27272A]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="px-4 py-3 md:px-6 md:h-[56px] flex items-center justify-between gap-2">
          <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[28px] font-semibold text-white truncate pr-3">
            {title}
          </p>
          <button
            onClick={onClose}
            aria-label="Close trailer"
            className="h-8 w-8 rounded-md border border-[#3F3F46] text-white text-[18px] leading-none cursor-pointer hover:bg-[#27272A] flex items-center justify-center"
          >
            X
          </button>
        </div>
        <div className="w-full aspect-video bg-black">
          {trailerKey ? (
            <iframe
              title={title || "Movie trailer"}
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#A1A1AA] text-sm">
              Trailer unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;

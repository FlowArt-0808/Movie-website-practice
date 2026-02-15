"use client";

import { useRouter } from "next/navigation";

const TrailerModal = ({ isOpen, trailerKey, title, movieId, onClose }) => {
  const router = useRouter();

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
        <div className="px-4 py-3 md:px-6 md:h-[56px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-[18px] md:text-[22px] leading-[24px] md:leading-[28px] font-semibold text-white truncate pr-3">
            {title}
          </p>
          <button
            onClick={() => {
              if (movieId) router.push(`/MovieDetails/${movieId}`);
            }}
            className="h-8 px-3 md:px-4 rounded-md bg-[#2563EB] text-white text-[11px] md:text-[12px] font-semibold tracking-[0.02em] cursor-pointer hover:bg-[#1D4ED8] whitespace-nowrap self-start sm:self-auto"
          >
            SEE MOVIE DETAILS
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

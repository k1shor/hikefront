import React from "react";
import { useNavigate } from "react-router-dom";

const DestinationCard = ({ tour }) => {
  const navigate = useNavigate();

  if (!tour) return null;

  const {
    _id,
    images,
    title,
    location,
    duration,
    price,
    discount,
    isBestSeller,
    isNewTrip,
    isPromo,
    groupSize,
    status,
    averageRating,
    totalReviews,
  } = tour;

  const imageUrl =
    images && images.length > 0
      ? `${images[0]}`
      : "https://via.placeholder.com/400x300?text=No+Image";

  const hasDiscount = discount > 0;
  const safePrice = price || 0;
  const finalPrice = hasDiscount ? safePrice - safePrice * (discount / 100) : safePrice;
  const isActive = status?.toLowerCase().includes("active") && !status?.toLowerCase().includes("not");

  return (
    <div
      onClick={() => navigate(`/tour/${_id}`)}
      className="premium-panel rounded-[2rem] overflow-hidden group cursor-pointer transition-all duration-500 flex flex-col h-full min-h-[500px] hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(47,59,69,0.16)]"
    >
      <div className="relative h-72 shrink-0 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(47,59,69,0.05),rgba(47,59,69,0.4))]"></div>

        <div
          className={`absolute top-4 right-4 z-20 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.24em] rounded-full shadow-lg ${
            isActive ? "bg-[#43d3a5] text-[#1d3831]" : "bg-white/80 text-[#52606d]"
          }`}
        >
          {isActive ? "Active" : "Not Active"}
        </div>

        {(isBestSeller || isNewTrip) && (
          <div className="absolute top-4 left-4 z-20 bg-white/88 text-[#2f3b45] rounded-full w-[4.65rem] h-[4.65rem] flex flex-col items-center justify-center text-center shadow-[0_18px_30px_rgba(47,59,69,0.15)] border border-white/80 backdrop-blur-md">
            <span className="text-[10px] font-black leading-tight uppercase tracking-[0.08em]">
              {isBestSeller ? (
                <>
                  Best
                  <br />
                  Seller
                </>
              ) : (
                <>
                  New
                  <br />
                  Trip
                </>
              )}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(46,170,197,0.18),rgba(106,103,200,0.25),rgba(246,95,103,0.18))] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
          <span className="text-white text-sm font-black uppercase tracking-[0.3em] bg-white/15 px-6 py-2 rounded-full border border-white/30">
            View Journey
          </span>
        </div>

        {isPromo && (
          <div className="absolute bottom-0 w-full bg-gradient-to-r from-[#2eaac5] via-[#6a67c8] to-[#f65f67] text-white text-[10px] font-black py-2.5 px-4 tracking-[0.22em] uppercase text-center">
            Limited Time Offer
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col grow bg-transparent">
        <div className="flex justify-between items-start gap-3 mb-3">
          <span className="bg-[#2eaac5]/10 text-[#2eaac5] text-[10px] font-black px-3 py-1.5 rounded-full tracking-[0.22em] uppercase border border-[#2eaac5]/15">
            {location}
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[#f4b400] text-sm">★</span>
            <span className="text-[11px] font-black text-[#2f3b45]">
              {averageRating > 0 ? averageRating.toFixed(1) : "New"}
            </span>
            {totalReviews > 0 && (
              <span className="text-[10px] text-[#7a8694] font-medium">({totalReviews})</span>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-black tracking-[-0.03em] text-[#2f3b45] leading-tight mb-2 group-hover:text-[#6a67c8] transition-colors">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-[#65717d]">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">⏳</span>
            <p className="font-semibold text-xs uppercase tracking-[0.16em]">{duration}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg">👥</span>
            <p className="font-semibold text-xs uppercase tracking-[0.16em]">Max {groupSize}</p>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-[#2f3b45]/6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[10px] text-[#f65f67] line-through font-bold uppercase tracking-[0.18em] mb-1">
                  Was Rs {Number(safePrice).toLocaleString()}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] font-bold text-[#7a8694] uppercase mr-1 tracking-[0.2em]">
                  From
                </span>
                <span className="font-black text-2xl text-[#2f3b45]">
                  Rs {Number(finalPrice).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#2eaac5] via-[#6a67c8] to-[#f65f67] p-2.5 rounded-2xl group-hover:scale-105 transition-transform shadow-[0_16px_34px_rgba(106,103,200,0.2)]">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M14 5l7 7-7 7M5 12h16"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;

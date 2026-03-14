import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row gap-5 items-start rounded-[1.75rem] border border-white/60 bg-white/70 p-5 md:p-6 backdrop-blur-xl shadow-[0_18px_40px_rgba(47,59,69,0.08)]">
      <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-2xl bg-[linear-gradient(135deg,rgba(67,211,165,0.14),rgba(106,103,200,0.14),rgba(246,95,103,0.14))]">
        <img src={icon} alt={title} className="w-10 md:w-12 h-auto" />
      </div>
      <div className="space-y-2">
        <h1 className="font-bold text-xl tracking-[-0.02em] text-[#2f3b45]">{title}</h1>
        <p className="text-[#65717d] leading-7">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

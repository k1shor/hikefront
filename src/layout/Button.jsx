import React from "react";

const Button = ({ title, variant = "primary", className = "", onClick, type = "button" }) => {
  const variants = {
    destination:
      "bg-gradient-to-r from-[#2eaac5] via-[#6a67c8] to-[#f65f67] text-white shadow-[0_14px_35px_rgba(106,103,200,0.28)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(106,103,200,0.35)]",
    primary:
      "bg-gradient-to-r from-[#2eaac5] via-[#6a67c8] to-[#f65f67] text-white shadow-[0_14px_35px_rgba(106,103,200,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(106,103,200,0.32)]",
    secondary:
      "bg-white/80 text-[#2f3b45] border border-[#2eaac5]/20 hover:bg-white hover:border-[#6a67c8]/30 hover:text-[#6a67c8] shadow-[0_10px_24px_rgba(47,59,69,0.08)]",
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${selectedVariant} ${className} rounded-full px-6 md:px-8 py-2.5 font-semibold tracking-[0.02em] transition-all duration-300 cursor-pointer inline-flex items-center justify-center`}
    >
      {title}
    </button>
  );
};

export default Button;

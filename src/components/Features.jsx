import React from "react";
import FeatureCard from "../layout/FeatureCard";
import img from "../assets/img/flags.png";
import png1 from "../assets/img/png1.png";
import png2 from "../assets/img/png2.png";
import png3 from "../assets/img/png3.png";

const Features = () => {
  return (
    <section className="section-shell py-28 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="space-y-5 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a8694]">
              Signature benefits
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.05em] text-center lg:text-left leading-[1] text-[#2f3b45]">
              Get ready to explore with a more <span className="gradient-text">refined experience.</span>
            </h1>
            <p className="text-[#65717d] text-lg leading-8 text-center lg:text-left">
              Discover the best holiday experiences with TravelForU through polished service, curated destinations, and pricing designed to feel premium without excess.
            </p>
          </div>
          <div className="w-full max-w-2xl mt-10 mx-auto lg:mx-0 rounded-[2rem] overflow-hidden border border-white/60 bg-white/60 p-3 backdrop-blur-xl shadow-[0_24px_55px_rgba(47,59,69,0.12)]">
            <img
              className="w-full rounded-[1.4rem] transition-transform hover:scale-[1.02] duration-500"
              src={img}
              alt="Travel Experience"
            />
          </div>
        </div>

        <div className="space-y-6">
          <FeatureCard
            icon={png1}
            title="Friendly Services"
            description="We provide thoughtful, attentive support at every stage of the journey for a smoother travel experience."
          />
          <FeatureCard
            icon={png2}
            title="Unforgettable Locations"
            description="Explore the most beautiful destinations and hidden gems with carefully selected routes and local insight."
          />
          <FeatureCard
            icon={png3}
            title="Affordable Prices"
            description="Premium-feeling travel experiences designed to stay accessible while maintaining quality and comfort."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

import React from "react";
import Button from "../layout/Button";
import video from "../assets/video/hero.mp4";   // add your video here
import SearchBar from "./SearchBar";
import { HiOutlinePhone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-screen lg:min-h-[94vh] flex items-center overflow-hidden">

        {/* VIDEO BACKGROUND */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(47,59,69,0.86),rgba(47,59,69,0.38),rgba(106,103,200,0.2))]"></div>

        {/* RADIAL EFFECT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(67,211,165,0.25),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(246,95,103,0.2),transparent_30%)]"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 section-shell w-full pt-28 pb-24 md:pt-36 md:pb-32">
          <div className="max-w-4xl text-center mx-auto px-1">
            <p className="mb-5 text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-white/75 animate-pop-up">
              Bespoke journeys, refined experiences
            </p>

            <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.3rem] text-white leading-[0.95] tracking-[-0.05em] animate-pop-up">
              Discover destinations with a more elevated point of view.
            </h1>

            <p className="mt-7 text-base sm:text-lg md:text-2xl text-white/85 max-w-3xl mx-auto animate-pop-up leading-8">
              Experience the dream with TravelForU through thoughtfully curated itineraries,
              seamless planning, and memorable premium escapes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                title="Explore Destinations"
                variant="destination"
                onClick={() => navigate("/destinations")}
              />

              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="rounded-full border border-white/25 bg-white/10 px-6 py-3 text-white backdrop-blur-md font-semibold hover:bg-white/18 transition-all"
              >
                Plan a Custom Tour
              </button>
            </div>
          </div>
        </div>

      </section>

      <SearchBar />

      {/* CONTACT CTA */}
      <div className="section-shell py-12 md:py-16">
        <div className="relative overflow-hidden rounded-4xl border border-white/60 bg-[linear-gradient(135deg,rgba(46,170,197,0.94),rgba(106,103,200,0.92),rgba(246,95,103,0.9))] px-6 py-8 md:px-10 lg:px-12 shadow-[0_24px_60px_rgba(76,90,140,0.25)]">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_28%)]"></div>

          <div className="relative flex flex-col xl:flex-row items-start xl:items-center justify-between gap-8 xl:gap-12">

            <div className="text-white max-w-2xl">
              <p className="text-xs uppercase tracking-[0.35em] font-semibold text-white/70 mb-3">
                Direct support
              </p>

              <h2 className="text-4xl md:text-5xl font-black tracking-[-0.04em] mb-3">
                Speak with our travel team.
              </h2>

              <p className="text-base md:text-lg opacity-90 leading-8">
                Questions about routes, availability, or custom itineraries? Our advisors are ready to assist.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-8 w-full xl:w-auto">

              <div className="flex items-center gap-4 text-white">
                <div className="h-14 w-14 rounded-full bg-white/16 border border-white/20 flex items-center justify-center backdrop-blur-md">
                  <HiOutlinePhone className="text-3xl" />
                </div>

                <span className="text-2xl md:text-3xl font-black tracking-[-0.03em]">
                  977-9657836821
                </span>
              </div>

              <button
                className="rounded-full bg-white px-7 py-3.5 font-semibold text-[#2f3b45] hover:-translate-y-0.5 transition-all shadow-[0_18px_36px_rgba(255,255,255,0.22)] whitespace-nowrap cursor-pointer"
                onClick={() => navigate("/contact")}
                type="button"
              >
                Send an Inquiry
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
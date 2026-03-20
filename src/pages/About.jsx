import React from "react";
import sun from "../assets/img/sun.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative, Autoplay } from "swiper/modules";

const About = () => {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white overflow-x-hidden">
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={sun}
            alt="About us"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-white"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-4 tracking-tighter">
            About Us
          </h1>
          <p className="text-white/85 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            Discover a travel experience shaped by trust, comfort, and
            beautifully planned adventures.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f06a6f] mb-3">
            Who We Are
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#1f2937] mb-6">
            We Are a Trusted Tour and Travel Agency, Standing Up for Every
            Journey You Take
          </h2>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mb-6">
            <span className="inline-flex items-center text-[#2ea9c6] font-semibold text-sm sm:text-base">
              <span className="mr-2 text-lg">💰</span>
              Affordable Prices
            </span>
            <span className="inline-flex items-center text-[#6c63c7] font-semibold text-sm sm:text-base">
              <span className="mr-2 text-lg">🛋️</span>
              Prioritize Comfort
            </span>
          </div>

          <p className="text-gray-600 leading-7 text-sm md:text-base max-w-2xl">
            
          </p>
        </div>

        <div className="w-full overflow-hidden shadow-2xl min-h-[360px] md:min-h-[420px]">
          <Swiper
            grabCursor={true}
            effect={"creative"}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            creativeEffect={{
              prev: {
                shadow: true,
                translate: [0, 0, -400],
              },
              next: {
                translate: ["100%", 0, 0],
              },
            }}
            modules={[EffectCreative, Autoplay]}
            className="h-full w-full"
          >
            <SwiperSlide className="flex items-center justify-center bg-[#43d3a3] text-white px-8 py-12 md:p-12">
              <div className="text-center max-w-md">
                <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/80">
                  Experience
                </p>
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                  Benefits
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-7">
                  Quality services and thoughtfully designed travel experiences
                  tailored to your journey.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center bg-[#2ea9c6] text-white px-8 py-12 md:p-12">
              <div className="text-center max-w-md">
                <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/80">
                  Learn
                </p>
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                  Webinar
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-7">
                  Join our regular sessions for destination insights, travel
                  guidance, and planning advice.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="flex items-center justify-center bg-[#6c63c7] text-white px-8 py-12 md:p-12">
              <div className="text-center max-w-md">
                <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/80">
                  Trust
                </p>
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                  Safety
                </h3>
                <p className="text-white/90 text-sm md:text-base leading-7">
                  Your comfort, confidence, and security remain central to every
                  itinerary we create.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="bg-[#1f2937] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🧭</div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Tours Guide
            </h3>
            <p className="text-white/75 text-sm md:text-base max-w-xs leading-7">
              Expert guidance for destinations planned with care and clarity.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🔥</div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Safe Travel
            </h3>
            <p className="text-white/75 text-sm md:text-base max-w-xs leading-7">
              Verified planning and dependable support for more secure journeys.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🏔️</div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Clear Price
            </h3>
            <p className="text-white/75 text-sm md:text-base max-w-xs leading-7">
              Transparent pricing with no unnecessary surprises along the way.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
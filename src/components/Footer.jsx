import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(246,247,251,0.96))] backdrop-blur-xl">
      <div className="section-shell py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-end border-b border-[#2f3b45]/8 pb-10 md:pb-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#7a8694] mb-4">
              Elevated travel planning
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-[#2f3b45] max-w-xl leading-tight">
              Curated journeys with a cleaner, more premium experience.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:justify-self-end lg:min-w-[620px]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6a67c8] mb-3">
                Browse brochure
              </p>
              <p className="text-[#52606d] leading-7">
                Explore the latest itineraries, curated routes, and signature destination packages.
              </p>
              <Link to="/destinations" className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[#2f3b45] hover:text-[#6a67c8] transition-colors">
                Discover trips
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#f65f67] mb-3">
                Stay connected
              </p>
              <p className="text-[#52606d] leading-7">
                Receive updates on limited departures, new destinations, and premium seasonal offers.
              </p>
              <div className="flex items-center gap-3 mt-5 text-[#2f3b45]">
                <a href="#" className="h-11 w-11 rounded-full border border-[#2f3b45]/10 bg-white flex items-center justify-center shadow-[0_12px_24px_rgba(47,59,69,0.08)] hover:-translate-y-0.5 hover:text-[#6a67c8] transition-all">
                  <FaFacebookF />
                </a>
                <a href="#" className="h-11 w-11 rounded-full border border-[#2f3b45]/10 bg-white flex items-center justify-center shadow-[0_12px_24px_rgba(47,59,69,0.08)] hover:-translate-y-0.5 hover:text-[#f65f67] transition-all">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:grid-cols-[1.1fr_1fr_1fr_1fr_0.9fr] py-10 md:py-12 text-sm">
          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a8694]">Destinations</h3>
            <div className="space-y-3 text-[#52606d]">
              <Link to="/destinations" className="block hover:text-[#2f3b45]">Offers</Link>
              <Link to="/destinations" className="block hover:text-[#2f3b45]">Tours</Link>
              <Link to="/custom-tours" className="block hover:text-[#2f3b45]">Custom Tours</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a8694]">Information</h3>
            <div className="space-y-3 text-[#52606d]">
              <Link to="/faq" className="block hover:text-[#2f3b45]">FAQ</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a8694]">About</h3>
            <div className="space-y-3 text-[#52606d]">
              <Link to="/about" className="block hover:text-[#2f3b45]">About us</Link>
              <Link to="/testimonials" className="block hover:text-[#2f3b45]">Reviews</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7a8694]">Customer Care</h3>
            <div className="space-y-3 text-[#52606d]">
              <Link to="/contact" className="block hover:text-[#2f3b45]">Contact us</Link>
              <Link to="/profile" className="block hover:text-[#2f3b45]">My account</Link>
            </div>
          </div>

          <div className="col-span-2 md:col-span-4 xl:col-span-1 xl:text-right xl:justify-self-end">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-[#2f3b45]">
              HIKE<span className="gradient-text">HUB</span>
            </h1>
            <p className="text-[11px] text-[#7a8694] mt-2 uppercase tracking-[0.32em]">Est. 2024</p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#2f3b45]/8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-[#7a8694]">
          <p>All Rights Reserved © 2023 - HikeHub</p>
          <div className="flex gap-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#52606d]">
            <span>Visa</span>
            <span>Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

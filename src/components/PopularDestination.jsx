import React, { useState, useEffect } from "react";
import DestinationCard from "./DestinationCard";
import { getAllDestinations } from "../api/destinationApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const PopularDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await getAllDestinations();
      const destinationsArray = response.data || [];
      const popularOnes = destinationsArray.filter((item) => item.isBestSeller === true);
      setDestinations(popularOnes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  if (loading) return <div className="py-20 text-center text-[#65717d]">Loading Popular Tours...</div>;
  if (error) return <div className="py-20 text-center text-red-500">Error: {error}</div>;
  if (destinations.length === 0) return null;

  return (
    <section id="populardestinations" className="section-shell py-12 md:py-16">
      <div className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a8694] mb-3">
            Curated collection
          </p>
          <h2 className="text-4xl md:text-6xl font-black tracking-[-0.05em] text-[#2f3b45] overflow-hidden leading-[0.95]">
            <span className="inline-block animate-slide-left">Our most</span>
            <br />
            <span className="inline-block gradient-text animate-slide-right">popular tours</span>
          </h2>
        </div>
        <p className="max-w-md text-[#65717d] leading-7">
          A selection of standout itineraries with strong guest demand, polished experiences, and memorable routes.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={26}
        slidesPerView={1}
        loop={destinations.length > 3}
        grabCursor={true}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1120: { slidesPerView: 3 },
        }}
        className="pb-14"
      >
        {destinations.map((item) => (
          <SwiperSlide key={item._id} className="h-auto flex">
            <DestinationCard tour={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularDestination;

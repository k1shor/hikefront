import React, { useState, useEffect } from "react";
import DestinationCard from "../components/DestinationCard";
import { getAllDestinations } from "../api/destinationApi";
import { useSearchParams } from "react-router-dom";

const Destination = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const locationQuery = searchParams.get("location");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getAllDestinations();
        setTours(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destinations:", error);
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    let result = tours;

    if (selectedLocations.length > 0) {
      result = result.filter((tour) => selectedLocations.includes(tour.location));
    } else if (locationQuery) {
      result = result.filter(
        (tour) =>
          tour.location.toLowerCase().includes(locationQuery.toLowerCase()) ||
          tour.title.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    setFilteredTours(result);
    setCurrentPage(1);
  }, [selectedLocations, tours, locationQuery]);

  const uniqueLocations = [...new Set(tours.map((tour) => tour.location))];

  const handleLocationChange = (location) => {
    if (locationQuery) {
      setSearchParams({});
    }

    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSelectedLocations([]);
    setSearchParams({});
  };

  const toursPerPage = 4;
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);
  const totalPages = Math.ceil(filteredTours.length / toursPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh] italic text-[#65717d]">
        Finding your next adventure...
      </div>
    );

  return (
    <div className="min-h-screen pt-10 md:pt-16">
      <div className="section-shell py-10 md:py-14 flex flex-col lg:flex-row gap-8 xl:gap-12 text-[#2f3b45]">
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-32 rounded-[1.8rem] border border-white/70 bg-white/76 backdrop-blur-xl shadow-[0_20px_50px_rgba(47,59,69,0.1)] p-6">
            <div className="flex justify-between items-center mb-6 gap-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a8694]">
                Filter By
              </h2>
              {(selectedLocations.length > 0 || locationQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-[#f65f67] hover:text-[#d94b53] transition-colors uppercase tracking-[0.18em]"
                  type="button"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="border-t border-[#2f3b45]/8 pt-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#2f3b45]">
                Location
              </p>
              {uniqueLocations.length > 0 ? (
                uniqueLocations.map((loc) => (
                  <label
                    key={loc}
                    className="flex items-center text-sm text-[#65717d] cursor-pointer hover:text-[#2f3b45] group transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc)}
                      onChange={() => handleLocationChange(loc)}
                      className="mr-3 w-4 h-4 border-gray-300 rounded accent-[#6a67c8]"
                    />
                    <span className={selectedLocations.includes(loc) ? "text-[#2f3b45] font-semibold" : ""}>
                      {loc}
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-[#7a8694] italic">No locations available</p>
              )}
            </div>
          </div>
        </aside>

        <main className="grow min-w-0">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-3 mb-10 pb-5 border-b border-[#2f3b45]/8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a8694] mb-3">
                Destination collection
              </p>
              <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-[#2f3b45]">
                {locationQuery ? `Results for "${locationQuery}"` : "All Destinations"}
              </h1>
            </div>
            <p className="text-[#7a8694] text-[11px] font-semibold uppercase tracking-[0.22em]">
              Showing {filteredTours.length > 0 ? indexOfFirstTour + 1 : 0}-
              {Math.min(indexOfLastTour, filteredTours.length)} of {filteredTours.length} Experiences
            </p>
          </div>

          {filteredTours.length === 0 ? (
            <div className="text-center py-24 md:py-32 rounded-[2rem] border border-dashed border-[#2f3b45]/14 bg-white/70 backdrop-blur-xl">
              <p className="text-[#7a8694] italic text-lg">
                We couldn't find any trips matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-5 text-[#6a67c8] font-semibold text-sm uppercase tracking-[0.2em]"
                type="button"
              >
                View all packages
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {currentTours.map((tour) => (
                <DestinationCard
                  key={tour._id}
                  tour={{
                    ...tour,
                    image: tour.images[0],
                    bestSeller: tour.isBestSeller,
                    promo: tour.isPromo ? "PROMO" : null,
                  }}
                />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-16 md:mt-20 flex justify-center items-center gap-3 md:gap-4 flex-wrap">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="p-3 border border-[#2f3b45]/10 bg-white/80 rounded-full disabled:opacity-25 hover:bg-white transition-colors shadow-[0_10px_22px_rgba(47,59,69,0.06)]"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="flex gap-2 flex-wrap justify-center">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-11 h-11 rounded-full text-sm font-semibold transition-all ${
                      currentPage === i + 1
                        ? "bg-gradient-to-r from-[#2eaac5] via-[#6a67c8] to-[#f65f67] text-white shadow-[0_18px_34px_rgba(106,103,200,0.24)]"
                        : "text-[#65717d] bg-white/80 hover:text-[#2f3b45] hover:bg-white border border-[#2f3b45]/8"
                    }`}
                    type="button"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="p-3 border border-[#2f3b45]/10 bg-white/80 rounded-full disabled:opacity-25 hover:bg-white transition-colors shadow-[0_10px_22px_rgba(47,59,69,0.06)]"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Destination;

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { getAllDestinations } from "../api/destinationApi";

const SearchBar = () => {
  const [allDestinations, setAllDestinations] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getAllDestinations();
        if (response?.success) {
          setAllDestinations(response.data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = allDestinations.filter(
        (dest) =>
          dest.location.toLowerCase().startsWith(value.toLowerCase()) ||
          dest.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const selectOption = (location) => {
    setSearchTerm(location);
    setShowDropdown(false);
    navigate(`/destinations?location=${encodeURIComponent(location)}`);
  };

  const handleSearch = () => {
    if (!searchTerm) return;
    navigate(`/destinations?location=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="relative z-20 -mt-10 md:-mt-14 flex justify-center w-full section-shell">
      <div className="w-full rounded-[2rem] border border-white/60 bg-white/78 p-5 md:p-7 lg:p-8 backdrop-blur-xl shadow-[0_24px_60px_rgba(47,59,69,0.14)]">
        <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 xl:gap-8">
          <div className="w-full xl:w-[280px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7a8694] mb-2">
              Quick search
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-[-0.04em] text-[#2f3b45]">
              Find your next journey.
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full xl:flex-1 items-stretch md:items-center">
            <div className="relative w-full" ref={wrapperRef}>
              <div className="min-h-[64px] border border-[#2f3b45]/10 bg-[#f7f8fc] rounded-2xl px-4 flex items-center gap-3 focus-within:border-[#6a67c8]/35 focus-within:bg-white transition-all">
                <HiOutlineLocationMarker className="text-[#6a67c8] text-2xl shrink-0" />
                <input
                  type="text"
                  placeholder="Where would you like to go?"
                  className="w-full bg-transparent outline-none text-[#2f3b45] placeholder:text-[#8b96a3] cursor-text text-sm md:text-base"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={() => searchTerm.length > 0 && setShowDropdown(true)}
                />
              </div>

              {showDropdown && filteredOptions.length > 0 && (
                <ul className="absolute left-0 right-0 mt-3 bg-white border border-[#2f3b45]/8 rounded-2xl shadow-[0_20px_50px_rgba(47,59,69,0.14)] z-50 max-h-60 overflow-y-auto overflow-x-hidden">
                  {filteredOptions.map((dest) => (
                    <li
                      key={dest._id}
                      onClick={() => selectOption(dest.location)}
                      className="px-5 py-3 hover:bg-[#f6f7fb] cursor-pointer flex flex-col border-b border-[#2f3b45]/5 last:border-none"
                    >
                      <span className="font-semibold text-[#2f3b45]">
                        {dest.location}
                      </span>
                      <span className="text-xs text-[#7a8694]">{dest.title}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleSearch}
              className="rounded-2xl bg-gradient-to-r from-[#2eaac5] via-[#6a67c8] to-[#f65f67] text-white hover:-translate-y-0.5 active:scale-[0.98] transition-all px-8 py-4 font-semibold uppercase tracking-[0.22em] text-xs md:text-sm w-full md:w-auto whitespace-nowrap cursor-pointer shadow-[0_18px_42px_rgba(106,103,200,0.24)]"
              type="button"
            >
              Find My Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

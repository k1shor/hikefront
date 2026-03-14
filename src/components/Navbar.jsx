import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../layout/Button";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { isLoggedIn } from "../api/authAPI";

const Navbar = ({ openLogin, openSignup }) => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const auth = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const HikeHubLogo = () => (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#43d3a5] via-[#2eaac5] to-[#6a67c8] p-2 rounded-2xl shadow-[0_16px_34px_rgba(46,170,197,0.25)] transition-transform duration-300 group-hover:rotate-6 flex-shrink-0">
      <svg
        width="30"
        height="30"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 80L50 20L85 80H15Z" fill="white" />
        <path
          d="M50 20L60 38L50 34L40 38L50 20Z"
          fill="#2f3b45"
          fillOpacity="0.18"
        />
        <path
          d="M35 80C35 80 43 65 50 65C57 65 65 80 65 80"
          stroke="#2f3b45"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  const handleSignout = () => {
    localStorage.removeItem("auth");
    setMenu(false);
    navigate("/");
    window.location.reload();
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Destinations", path: "/destinations" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
  ];

  const desktopLinkBase =
    "relative pb-2 text-[#52606d] transition-all duration-300 cursor-pointer whitespace-nowrap after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-gradient-to-r after:from-[#2eaac5] after:via-[#6a67c8] after:to-[#f65f67] after:transition-all after:duration-300 hover:text-[#2f3b45]";
  const desktopActive = "font-semibold text-[#2f3b45] after:w-full";

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-[1.7rem] border px-4 py-3 md:px-6 lg:px-8 transition-all duration-300 ${
          scrolled
            ? "bg-white/78 shadow-[0_18px_45px_rgba(47,59,69,0.16)] backdrop-blur-xl border-white/60"
            : "bg-white/62 shadow-[0_10px_28px_rgba(47,59,69,0.08)] backdrop-blur-lg border-white/55"
        }`}
      >
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex items-center gap-3 group">
            <HikeHubLogo />
            <div className="leading-none">
              <h1 className="text-xl lg:text-2xl font-black tracking-[-0.04em] text-[#2f3b45]">
                HIKE<span className="gradient-text">HUB</span>
              </h1>
              <p className="hidden sm:block text-[10px] uppercase tracking-[0.35em] text-[#7a8694] mt-1">
                Premium travel journeys
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden lg:flex flex-row items-center gap-5 xl:gap-8 mx-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `${desktopLinkBase} ${isActive ? desktopActive : "after:w-0"}`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex flex-row items-center gap-3 xl:gap-4 flex-shrink-0">
          {auth ? (
            <>
              <Link to={auth.user?.role === 1 ? "/admin/dashboard" : "/profile"}>
                <Button
                  title={auth.user?.role === 1 ? "Dashboard" : "Profile"}
                  variant="secondary"
                />
              </Link>
              <Button title="Sign Out" variant="primary" onClick={handleSignout} />
            </>
          ) : (
            <>
              <Button title="Login" variant="secondary" onClick={openLogin} />
              <Button title="Signup" variant="primary" onClick={openSignup} />
            </>
          )}
        </div>

        <button
          className="lg:hidden flex items-center justify-center h-11 w-11 rounded-full border border-[#2eaac5]/15 bg-white/80 text-[#2f3b45] shadow-[0_10px_24px_rgba(47,59,69,0.08)]"
          onClick={() => setMenu((prev) => !prev)}
          type="button"
          aria-label="Toggle menu"
        >
          {menu ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-x-3 top-[5.4rem] rounded-[1.9rem] border border-white/60 bg-white/86 backdrop-blur-2xl shadow-[0_24px_60px_rgba(47,59,69,0.18)] transition-all duration-300 ${
          menu ? "translate-y-0 opacity-100 visible" : "-translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col px-5 py-6 text-center gap-1 max-h-[calc(100vh-7rem)] overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 text-base font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#2eaac5]/12 via-[#6a67c8]/12 to-[#f65f67]/12 text-[#2f3b45]"
                    : "text-[#52606d] hover:bg-[#f6f7fb] hover:text-[#2f3b45]"
                }`
              }
              onClick={() => setMenu(false)}
            >
              {item.name}
            </NavLink>
          ))}
          <div className="flex flex-col items-stretch gap-3 mt-5">
            {auth ? (
              <>
                <Link
                  to={auth.user?.role === 1 ? "/admin/dashboard" : "/profile"}
                  onClick={() => setMenu(false)}
                >
                  <Button title={auth.user?.role === 1 ? "Dashboard" : "Profile"} variant="secondary" className="w-full" />
                </Link>
                <Button onClick={handleSignout} title="Sign Out" variant="primary" className="w-full" />
              </>
            ) : (
              <>
                <Button onClick={() => { setMenu(false); openLogin(); }} title="Login" variant="secondary" className="w-full" />
                <Button onClick={() => { setMenu(false); openSignup(); }} title="Signup" variant="primary" className="w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-zinc-800 px-4 md:px-8 py-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <h1
          onClick={() => navigate("/")}
          className="text-white text-xl md:text-2xl font-bold cursor-pointer"
        >
          Refine AI
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-zinc-400 font-medium">
          <li
            onClick={() => navigate("/dashboard")}
            className="hover:text-white cursor-pointer"
          >
            Dashboard
          </li>
          <li
            onClick={() => navigate("/resume")}
            className="hover:text-white cursor-pointer"
          >
            Resume
          </li>
          <li
            onClick={() => navigate("/history")}
            className="hover:text-white cursor-pointer"
          >
            History
          </li>
          <li
            onClick={() => navigate("/pricing")}
            className="hover:text-white cursor-pointer"
          >
            Pricing
          </li>
          <li
            onClick={() => navigate("/about")}
            className="hover:text-white cursor-pointer"
          >
            About
          </li>
        </ul>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-white px-4 py-2 hover:text-zinc-300"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black"
            >
              Get Started
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-2 rounded-full">
            <div className="h-9 w-9 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="hidden lg:flex flex-col">
              <span className="text-white text-sm">{user.name}</span>
              <span className="text-white/50 text-xs">{user.email}</span>
            </div>

            <button
              onClick={logout}
              className="text-white/70 hover:text-red-400 text-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-white"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-black border-t border-zinc-800 flex flex-col gap-4 p-4 md:hidden z-50">
          <span onClick={() => navigate("/dashboard")} className="text-white">
            Dashboard
          </span>
          <span onClick={() => navigate("/resume")} className="text-white">
            Resume
          </span>
          <span onClick={() => navigate("/history")} className="text-white">
            History
          </span>
          <span onClick={() => navigate("/pricing")} className="text-white">
            Pricing
          </span>
          <span onClick={() => navigate("/about")} className="text-white">
            About
          </span>

          <div className="border-t border-zinc-700 pt-4 flex flex-col gap-3">
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-white text-left"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-black py-2 rounded-lg"
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <div className="text-white text-sm">{user.name}</div>
                <div className="text-white/50 text-xs">{user.email}</div>
                <button onClick={logout} className="text-red-400 text-left">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

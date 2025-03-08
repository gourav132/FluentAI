import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="absolute top-0 left-0 w-full h-16 items-center justify-between flex px-10">
      <Link
        to="/"
        className="text-lg font-semibold text-white tracking-tight hover:text-purple-200 transition-colors"
      >
        FluentAI
      </Link>

      <div className="flex gap-4">
        <Link
          to="/auto-complete"
          className={`text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
            location.pathname === "/auto-complete"
              ? "bg-black/20"
              : "hover:bg-black/20"
          }`}
        >
          Auto Complete
        </Link>
        <Link
          to="/grammar"
          className={`text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
            location.pathname === "/grammar"
              ? "bg-black/20"
              : "hover:bg-black/20"
          }`}
        >
          Correct Grammar
        </Link>
      </div>
    </div>
  );
}

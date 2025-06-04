import React, { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { closeNavbar, logoutIcon, openNavbar } from "../helpers/icons";
import { useLoginContext } from "../context/LoginProvider";
import { useCart } from "../hooks/useCart";
const navigation = [
  {
    title: "Home",
    path: "/dashboard",
  },
  {
    title: "Products",
    path: "/dashboard/products",
  },
  {
    title: "About",
    path: "/dashboard/about",
  },
  {
  title: "Cart",
  path: "/dashboard/cart",
  icon: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  ),
},
];

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { logout } = useLoginContext();
  const { cartItemCount } = useCart(); 

  return (
    <nav className="bg-navbarColor md:text-sm">
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setShow(!show)}
            >
              {show ? closeNavbar : openNavbar}
            </button>
          </div>
        </div>
        <div
          className={`${
            show ? "flex flex-col pb-2" : "hidden"
          } md:flex md:flex-row flex-1 items-center`}
        >
          <ul className="md:flex md:space-x-6">
  {navigation.map((item) => (
    <li
      key={item.title}
      className="text-gray-700 font-medium flex justify-center"
    >
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          `flex items-center gap-2 hover:bg-main rounded-full py-2 px-4 hover:text-white ${
            isActive ? "bg-main text-white" : ""
          }`
        }
      >
        {item.icon && item.icon}
        {item.title}

        {/* Show badge only on Cart link */}
        {item.title === "Cart" && cartItemCount > 0 && (
          <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </NavLink>
    </li>
  ))}
</ul>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <NavLink
              onClick={() => logout()}
              className="flex items-center justify-center gap-x-1 py-2 px-4 font-medium text-gray-700 hover:bg-main hover:text-white active:bg-gray-900 rounded-full md:inline-flex"
            >
              Logout {logoutIcon}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
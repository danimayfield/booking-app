"use client";
import React, { useState } from "react";
import { BsCalendarPlus, BsCalendarWeek } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import routes from "@/shared/routes";

type NavItem = {
  route: string;
  name: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    route: routes.home,
    icon: <HiOutlineHome size="1.5rem" className="text-white" />,
    name: "Home",
  },
  {
    route: routes.addBooking,
    icon: <BsCalendarPlus size="1.3rem" className="text-white" />,
    name: "Add Booking",
  },
  {
    route: routes.viewBookings,
    icon: <BsCalendarWeek size="1.3rem" className="text-white" />,
    name: "View All Bookings",
  },
];

const NavItem = ({ item }: { item: NavItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <a
      href={item.route}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={item.name}
    >
      <div className="block h-full w-full transition-all hover:scale-125">
        {item.icon}
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-12 top-0 hidden w-32 text-sm text-slate-700 sm:block"
          >
            {item.name}
          </motion.p>
        )}
      </AnimatePresence>
    </a>
  );
};

export const Nav = () => {
  return (
    <div className="sticky top-[40vh] ml-4 flex w-min flex-col items-center justify-center space-y-4 rounded-full bg-slate-300 px-3 pb-4 pt-3">
      {navItems.map(nav => (
        <NavItem item={nav} key={nav.name} />
      ))}
    </div>
  );
};

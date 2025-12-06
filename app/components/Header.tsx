"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { ThemeSwitcher } from "../utils/theme-switcher";

// Placeholder nav items
const NavItems = ({
  activeItem,
  isMobile,
}: {
  activeItem: number;
  isMobile: boolean;
}) => (
  <div className={isMobile ? "flex flex-col p-4" : "flex space-x-6"}>
    <Link href="/" className="text-black dark:text-white">
      Home
    </Link>
    <Link href="/courses" className="text-black dark:text-white">
      Courses
    </Link>
    <Link href="/about" className="text-black dark:text-white">
      About
    </Link>
  </div>
);

const avatarPlaceholder = "/assets/avatardefault.jpg";

type Props = {
  activeItem: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCloseSidebar = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "screen") setOpenSidebar(false);
  };

  // Placeholder user session (replace with actual session logic)
  const userData = null;

  return (
    <div className="w-full relative z-50">
      {/* Sticky header */}
      <div
        className={`${
          active
            ? "bg-white dark:bg-black shadow-xl border-b dark:border-[#ffffff1c] fixed top-0 left-0 right-0 h-20 transition duration-500"
            : "bg-transparent dark:bg-black border-b dark:border-[#ffffff1c] fixed top-0 left-0 right-0 h-20"
        }`}
      >
        <div className="w-[95%] max-w-[1200px] mx-auto h-20 flex items-center justify-between px-3">
          {/* Logo */}
          <Link
            href="/"
            className="text-[25px] font-Poppins font-medium text-black dark:text-white"
          >
            ELearning
          </Link>

          {/* Desktop navigation + actions */}
          <div className="flex items-center">
            <div className="hidden 800px:flex">
              <NavItems activeItem={activeItem} isMobile={false} />
            </div>

            {/* Theme toggle */}
            <ThemeSwitcher />

            {/* Mobile menu icon */}
            <div className="800px:hidden ml-2">
              <HiOutlineMenuAlt3
                size={28}
                className="cursor-pointer dark:text-white text-black"
                onClick={() => setOpenSidebar(true)}
              />
            </div>

            {/* User avatar or login icon */}
            {userData ? (
              <Link href="/profile">
                <Image
                  src={avatarPlaceholder}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full ml-4 cursor-pointer"
                />
              </Link>
            ) : (
              <HiOutlineUserCircle
                size={28}
                className="ml-4 cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 z-50 bg-black bg-opacity-30"
          onClick={handleCloseSidebar}
          id="screen"
        >
          <div className="w-[70%] h-full fixed right-0 top-0 bg-white dark:bg-slate-900 dark:bg-opacity-90 p-4">
            <NavItems activeItem={activeItem} isMobile={true} />

            {userData ? (
              <Link href="/profile">
                <Image
                  src={avatarPlaceholder}
                  alt="avatar"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full mt-4"
                />
              </Link>
            ) : (
              <HiOutlineUserCircle
                size={28}
                className="mt-4 cursor-pointer dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
            )}

            <p className="mt-8 text-black dark:text-white text-sm">
              Copyright ©️ 2025 ELearning
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

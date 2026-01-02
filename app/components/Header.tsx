"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import { NavItems } from "../utils/NavItems";
import  ThemeSwitcher  from "../utils/theme-switcher";
import CustomModel from "../utils/CustomModel";
import Login from "../auth/Login";
import SignUP from "../auth/SignUP";
import Verification from "../auth/Verification";
import { useLoadUserQuery } from "../../redux/features/auth/authApi";

// Placeholder avatar if user has none
const avatarPlaceholder =
  "https://res.cloudinary.com/dgve6ewpr/image/upload/v1764923919/users/q4kpl1cjacubpmvmppmw.jpg";

type Props = {
  activeItem: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  // Load user dynamically from backend via RTK Query
  const { data } = useLoadUserQuery();
  const user = data?.user;

  // Dynamically select avatar
  const userAvatar = user?.avatar?.url || avatarPlaceholder;

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 70);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const refetch = () => {};

  // Close sidebar when clicking outside
  const handleClose = (e: any) => {
    if (e.target.id === "screen") setOpenSidebar(false);
  };

  return (
    <>
      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50">
        <div
          className={`transition-all duration-300 ${
            isSticky
              ? "backdrop-blur-xl bg-white/70 dark:bg-black/60 shadow-lg border-b border-gray-200/30 dark:border-gray-700/30"
              : "bg-transparent dark:bg-black"
          }`}
        >
          <div className="w-[95%] max-w-[1250px] mx-auto h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-[26px] font-semibold text-black dark:text-white tracking-wide"
            >
              ELearning
            </Link>

            {/* Desktop Navigation */}
            <NavItems activeItem={activeItem} />

            <div className="flex items-center gap-3">
              <ThemeSwitcher />

              {/* Mobile menu icon */}
              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={30}
                  className="cursor-pointer text-black dark:text-white"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {/* User Avatar or Login Icon */}
              {user ? (
                <Link href="/profile">
                  <div className="w-10 h-10 relative rounded-full overflow-hidden cursor-pointer">
                    <Image
                      src={userAvatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={30}
                  className="cursor-pointer text-black dark:text-white"
                  onClick={() => {
                    setRoute("Login");
                    setOpen(true);
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sidebar */}
        {openSidebar && (
          <div
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 z-50"
            id="screen"
          >
            <div
              className="absolute right-0 top-0 h-full w-[70%] bg-white dark:bg-[#0f0f0f] p-6"
            >
              <NavItems isMobile activeItem={activeItem} />

              <div className="mt-8">
                {user ? (
                  <Link href="/profile">
                    <div className="w-10 h-10 relative rounded-full overflow-hidden cursor-pointer">
                      <Image
                        src={userAvatar}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={32}
                    className="cursor-pointer text-black dark:text-white"
                    onClick={() => {
                      setRoute("Login");
                      setOpen(true);
                    }}
                  />
                )}
              </div>

              <p className="mt-10 text-sm text-gray-600 dark:text-gray-400">
                © 2025 ELearning
              </p>
            </div>
          </div>
        )}
      </header>

      {/* LOGIN MODAL */}
      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}

      {/* SIGNUP MODAL */}
      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUP}
        />
      )}

      {/* VERIFICATION MODAL */}
      {route === "verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </>
  );
};

export default Header;

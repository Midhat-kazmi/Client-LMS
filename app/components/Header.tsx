"use client";

import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import ThemeSwitcher from "../utils/theme-switcher";
import { NavItems } from "../utils/NavItems";
import { motion } from "framer-motion";
import CustomModel from "../utils/CustomModel";
import Login from "../auth/Login";
import SignUP from "../auth/SignUP";
import Verification from "../auth/Verification";
import { useLoadUserQuery } from "../../redux/features/auth/authApi";

const avatarPlaceholder = "/assets/avatardefault.jpg";

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

  // Fetch user from RTK Query
  const { data: userData, isLoading } = useLoadUserQuery();

  // Sticky Header
  useEffect(() => {
    const scrollHandler = () => setIsSticky(window.scrollY > 70);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Placeholder refetch
  const refetch = () => {};

  return (
    <>
      <header className="w-full fixed top-0 left-0 z-50">
        <div
          className={`transition-all duration-300 ${
            isSticky
              ? "backdrop-blur-xl bg-white/70 dark:bg-black/60 shadow-lg border-b border-gray-200/30 dark:border-gray-700/30"
              : "bg-transparent dark:bg-black"
          }`}
        >
          <div className="w-[95%] max-w-[1250px] mx-auto h-20 flex items-center justify-between">
            <Link
              href="/"
              className="text-[26px] font-semibold text-black dark:text-white tracking-wide"
            >
              ELearning
            </Link>

            {/* Desktop Nav */}
            <NavItems activeItem={activeItem} />

            <div className="flex items-center gap-3">
              <ThemeSwitcher />

              <div className="md:hidden">
                <HiOutlineMenuAlt3
                  size={30}
                  className="cursor-pointer text-black dark:text-white"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>

              {userData?.user ? (
                <Image
                  src={avatarPlaceholder}
                  alt="avatar"
                  width={38}
                  height={38}
                  className="rounded-full cursor-pointer"
                />
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
            onClick={() => setOpenSidebar(false)}
            className="fixed inset-0 bg-black/40 z-50"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 18 }}
              className="absolute right-0 top-0 h-full w-[70%] bg-white dark:bg-[#0f0f0f] p-6"
            >
              <NavItems isMobile activeItem={activeItem} />
              <div className="mt-8">
                {userData?.user ? (
                  <Image
                    src={avatarPlaceholder}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
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
            </motion.div>
          </div>
        )}
      </header>

      {/* Modals */}
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

      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUP}
        />
      )}

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

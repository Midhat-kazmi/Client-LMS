"use client";

import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";

import SideBarProfile from "./SideBarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Courses/CourseCard";
import Loader from "../Loader/Loader";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";
import { useGetAllCourseQuery } from "@/redux/features/courses/courseApi";

// ---------------- Types ----------------
interface Course {
  id: string;
  title: string;
  [key: string]: any;
}

interface UserCourse {
  id: string;
}

interface User {
  courses?: UserCourse[];
  avatar?: string | { url: string };
  [key: string]: any;
}

interface Props {
  user: User;
}

// ---------------- Component ----------------
const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetAllCourseQuery(undefined);

  // ---------------- Sticky Sidebar ----------------
  useEffect(() => {
    const scrollHandler = () => setScroll(window.scrollY > 85);
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);


  // ---------------- Avatar Safe Handling ----------------
  const avatarPlaceholder =
    "https://res.cloudinary.com/dgve6ewpr/image/upload/v1764923919/users/q4kpl1cjacubpmvmppmw.jpg";

  let avatarUrl = avatarPlaceholder;
  if (user.avatar) {
    if (typeof user.avatar === "string") avatarUrl = user.avatar;
    else if ("url" in user.avatar && typeof user.avatar.url === "string")
      avatarUrl = user.avatar.url;
  }

  // ---------------- Logout ----------------
  const logOutHandler = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (result.success) {
        dispatch(logoutAction());
        setMobileSidebar(false);
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ---------------- Loading / Error ----------------
  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center pt-32 text-red-500">
        Failed to load profile data
      </div>
    );

  return (
    <div className="max-w-[1400px] mx-auto px-4 pt-24 pb-16 flex gap-6 relative">
      {/* Mobile Sidebar Toggle */}
      <button
        className="p-3 bg-gray-200 dark:bg-gray-800 rounded-xl fixed left-4 top-24 z-50 md:hidden"
        onClick={() => setMobileSidebar(true)}
      >
        <HiMenu size={26} />
      </button>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block w-[260px] rounded-2xl shadow-md 
        bg-white dark:bg-[#0f0f0f] border border-gray-200 dark:border-gray-700
        sticky ${scroll ? "top-[100px]" : "top-[140px]"} h-[450px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
        
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {/* Mobile Sidebar */}
      {mobileSidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-50 md:hidden"
          onClick={() => setMobileSidebar(false)}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", damping: 18 }}
            className="w-[75%] h-full bg-white dark:bg-[#0f0f0f] p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <SideBarProfile
              user={user}
              active={active}
             
              setActive={(v) => {
                setActive(v);
                setMobileSidebar(false);
              }}
              logOutHandler={logOutHandler}
            />
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1">
        {active === 1 && <ProfileInfo user={user} avatar={avatarUrl} />}
        {active === 2 && <ChangePassword />}

        {active === 3 && (
          <div className="w-full mt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((item) => (
                <CourseCard key={item.id} item={item} isProfile />
              ))}
            </div>

            {courses.length === 0 && (
              <h1 className="text-center text-[18px] font-Poppins mt-6">
                No enrolled courses found.
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

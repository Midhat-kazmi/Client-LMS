"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetAllCourseQuery } from "@/redux/features/courses/courseApi";
import CourseCard from "../Courses/CourseCard";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";

type Props = { user: any };

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar] = useState<string | null>(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const { data, isLoading } = useGetAllCourseQuery();
  const dispatch = useDispatch();

  // Logout handler
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
      } else {
        console.error("Logout failed:", result.message);
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Sticky scroll effect
  useEffect(() => {
    const scrollHandler = () => setScroll(window.scrollY > 85);
    setScroll(window.scrollY > 85);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Load user courses
  useEffect(() => {
    if (data && user) {
      const filtered = user.courses
        .map((item: any) => data.course.find((c: any) => c.id === item.id))
        .filter((c: any) => c);
      setCourses(filtered);
    }
  }, [data, user]);

  if (isLoading) return <Loader />;

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
        className={`hidden md:block w-[260px] 
        rounded-2xl shadow-md dark:shadow-none bg-white dark:bg-[#0f0f0f]
        border border-gray-200 dark:border-gray-700
        sticky ${scroll ? "top-[100px]" : "top-[140px]"}
        h-[450px] transition-all`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {/* Mobile Sidebar Drawer */}
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
              avatar={avatar}
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
      <div className="flex-1 bg-transparent">
        {active === 1 && <ProfileInfo user={user} avatar={avatar} />}
        {active === 2 && <ChangePassword />}

        {active === 3 && (
          <div className="w-full mt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((item: any, i: number) => (
                <CourseCard key={i} item={item} isProfile />
              ))}
            </div>

            {courses.length === 0 && (
              <h1 className="text-center text-[18px] font-Poppins mt-6">
                You don&apos;t have any purchased courses!
              </h1>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

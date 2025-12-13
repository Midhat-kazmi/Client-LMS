"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import CourseCard from "../Courses/CourseCard";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";
import { HiMenu } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";

type Props = { user: any };

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar] = useState(null);
  const [active, setActive] = useState(1);
  const [courses, setCourses] = useState([]);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const { data, isLoading } = useGetUsersAllCoursesQuery();
  const dispatch = useDispatch();

  // Logout handler
  const logOutHandler = async () => {
    try {
      await signOut({ redirect: false });
      dispatch(logoutAction());
      setMobileSidebar(false);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  // Scroll sticky
  useEffect(() => {
    setScroll(window.scrollY > 85);
    const scrollHandler = () => setScroll(window.scrollY > 85);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Load courses
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

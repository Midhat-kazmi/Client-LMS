"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";
import Loader from "../Loader/Loader";

const Hero = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const isLoading = false;

  const data = {
    layout: {
      banner: {
        image: { url: "/assets/hero-banner-1.png" },
        title: "Welcome to LMS",
        subTitle: "Learn anytime, anywhere with our trusted platform.",
      },
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    router.push(`/courses?title=${search}`);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-16 py-12 relative overflow-hidden">
          {/* Animated background circle */}
          <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-purple-500/10 dark:bg-purple-400/20 animate-pulse"></div>

          {/* Hero banner Image */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex items-center justify-center z-10 mb-10 lg:mb-0"
          >
            <Image
              src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1759371686/lms-learning-management-system-as-online-education-concept-educational-technology-online-learning-delivery-training-knowledge-software-application-qualification-framework-illustration-free-vector_uk8cmt.jpg"
              width={360}
              height={360}
              alt="Hero Banner"
              className="object-cover w-64 h-64 lg:w-96 lg:h-96 rounded-full shadow-2xl"
            />
          </motion.div>

          {/* Hero content section */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
          >
            {/* Headline */}
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {data.layout.banner.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              {data.layout.banner.subTitle}
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearch}
              className="w-full max-w-md mb-8"
            >
              <div className="relative group">
                <input
                  type="search"
                  placeholder="Search Courses..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 px-4 pr-12 text-lg text-gray-700 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center bg-purple-500 rounded-r-lg group-hover:bg-purple-600 transition-colors"
                >
                  <BiSearch className="text-white" size={24} />
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-4">
                <Image
                  src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1759371687/f49a1537ed0ad0933cc151f8253d8100_revxua.jpg"
                  alt="User 1"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
                />
                <Image
                  src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1754548277/avatars/c3t4yrlzawahrptjdkt8.jpg"
                  alt="User 2"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
                />
                <Image
                  src="https://res.cloudinary.com/dgve6ewpr/image/upload/v1757171811/avatars/k3ppf5cqmjl1bkko8mrn.jpg"
                  alt="User 3"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-900"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold">500K+</span> People already trust us.{" "}
                <Link href="/courses" className="text-purple-500 hover:underline dark:text-purple-400">
                  View Courses
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Hero;

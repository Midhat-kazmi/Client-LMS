"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader/Loader";
import Headings from "../utils/Heading";
import CourseCard from "../components/Courses/CourseCard";
import { styles } from "../styles/style";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

// Type for Category
type Category = {
  title: string;
};

// Type for Course
type Course = {
  _id: string;
  name: string;
  description: string;
  thumbnail: { url: string };
  categories?: string[];
};

const CoursesContent: React.FC = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams?.get("title") || "";

  // Fetch all courses
  const { data: coursesData, isLoading: coursesLoading } =
    useGetUsersAllCoursesQuery(undefined);

  // Fetch categories
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

  const layoutCategories: Category[] = categoriesData?.layout?.categories || [];

  const [category, setCategory] = useState<string>("All");
  const [courses, setCourses] = useState<Course[]>([]);
  const [route, setRoute] = useState<string>("Login");
  const [open, setOpen] = useState<boolean>(false);

  // Filter courses whenever data, category, or searchTerm changes
  useEffect(() => {
    const coursesArray: Course[] = coursesData?.courses ?? [];

    let filteredCourses = coursesArray;

    if (searchTerm) {
      filteredCourses = filteredCourses.filter((c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (category !== "All") {
      filteredCourses = filteredCourses.filter(
        (c) =>
          c.categories &&
          c.categories.some(
            (cat) => cat.toLowerCase() === category.toLowerCase()
          )
      );
    }

    setCourses(filteredCourses);
  }, [category, searchTerm, coursesData]);

  if (coursesLoading) return <Loader />;

  return (
    <>
      {/* Header */}
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1} // Courses tab active
      />

      {/* Main Content */}
      <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh] py-10">
        {/* SEO */}
        <Headings
          title="All Courses - LMS"
          description="LMS is a programming community."
          keywords="programming community, coding skills, expert insights, collaboration, growth"
        />

        {/* Categories */}
        <div className="w-full flex flex-wrap mt-4">
          <CategoryButton
            title="All"
            active={category === "All"}
            onClick={() => setCategory("All")}
          />
          {layoutCategories.map((cat, idx) => (
            <CategoryButton
              key={idx}
              title={cat.title}
              active={category === cat.title}
              onClick={() => setCategory(cat.title)}
            />
          ))}
        </div>

        {/* No Courses Found */}
        {courses.length === 0 && (
          <p
            className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
          >
            {searchTerm
              ? "No courses found!"
              : "No courses found in this category. Please try another one!"}
          </p>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 1500px:gap-[35px] mt-6 mb-12">
          {courses.map((course) => (
            <CourseCard key={course._id} item={course} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

// Category Button Component
type CategoryButtonProps = {
  title: string;
  active: boolean;
  onClick: () => void;
};

const CategoryButton: React.FC<CategoryButtonProps> = ({
  title,
  active,
  onClick,
}) => {
  return (
    <div
      className={`h-[35px] m-2 px-4 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer text-white ${
        active ? "bg-[crimson]" : "bg-[#5050cb]"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
};

// Page wrapper for Suspense
const Page: React.FC = () => (
  <Suspense fallback={<Loader />}>
    <CoursesContent />
  </Suspense>
);

export default Page;

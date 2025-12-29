import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import CourseCard from "../Courses/CourseCard";

const Courses = () => {
  const { data, refetch } = useGetUsersAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    refetch();
    if (data?.courses) setCourses(data.courses); 
  }, [data, refetch]);

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black font-bold tracking-tight">
          Expand Your Career <span className="text-gradient">Opportunity</span>
          <br />
          Opportunity With Our Courses
        </h1>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 1500px:grid-cols-4 mb-12 mt-10">
          {courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

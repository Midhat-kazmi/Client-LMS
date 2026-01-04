"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { IoCheckmarkDoneOutline, IoLockClosedOutline } from "react-icons/io5";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";

type Lesson = {
  _id: string;
  title: string;
  videoUrl: string;
  isFree: boolean;
};

type Course = {
  _id: string;
  name: string;
  description: string;
  thumbnail: { url: string }; // added thumbnail
  courseData: Lesson[];
};

const Page = () => {
  const params = useParams();
  const courseId = typeof params?.id === "string" ? params.id : "";

  const { data: userData, isLoading: userLoading } =
    useLoadUserQuery(undefined, {});

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (!courseId) return;

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/course/single-course/${courseId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setCurrentLesson(data.course.courseData[0] || null);
      })
      .catch(console.error);
  }, [courseId]);

  if (userLoading || !course || !currentLesson || !userData) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading course content...
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto py-6 flex flex-col lg:flex-row gap-6">

      {/* LEFT SIDE */}
      <div className="w-full lg:w-[68%] space-y-4">

        {/* COURSE THUMBNAIL */}
        {course.thumbnail?.url && (
          <div className="relative w-full h-[220px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={course.thumbnail.url}
              alt={course.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* VIDEO PLAYER */}
        <div className="bg-white dark:bg-[#0f0f1a] rounded-2xl shadow-lg p-4 border border-purple-100 dark:border-purple-900">
          {/* ✅ currentLesson is guaranteed non-null here */}
          <CoursePlayer
            videoUrl={currentLesson.videoUrl}
            title={currentLesson.title}
          />
        </div>
      </div>

      {/* RIGHT SIDE: COURSE CONTENT */}
      <div className="w-full lg:w-[32%] bg-white dark:bg-[#0f0f1a] rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900 p-5">

        {/* COURSE INFO */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {course.name}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-4">
          {course.description}
        </p>

        {/* LESSON LIST */}
        <h3 className="text-lg font-semibold mb-3 text-purple-600">
          Course Lessons
        </h3>

        <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2">
          {course.courseData.map((lesson, index) => {
            const isActive = currentLesson._id === lesson._id;

            return (
              <button
                key={lesson._id}
                onClick={() => setCurrentLesson(lesson)}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-left transition-all border
                  ${
                    isActive
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-purple-50 dark:bg-purple-900/20 text-gray-800 dark:text-gray-200 border-purple-100 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/40"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <IoCheckmarkDoneOutline
                    className={`${isActive ? "text-white" : "text-purple-600"}`}
                  />
                  <span className="text-sm font-medium">
                    {index + 1}. {lesson.title}
                  </span>
                </div>

                {!lesson.isFree && (
                  <IoLockClosedOutline
                    className={`${isActive ? "text-white" : "text-gray-400"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;

"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import CoursePlayer from "@/app/utils/CoursePlayer";
import { IoCheckmarkDoneOutline, IoLockClosedOutline } from "react-icons/io5";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Lesson = {
  _id: string;
  title: string;
  videoUrl: string;
  isFree: boolean;
  videoSection: string;
  videoLength: number; // in minutes
};

type Course = {
  _id: string;
  name: string;
  description: string;
  thumbnail: { url: string };
  courseData: Lesson[];
};

const Page = () => {
  const params = useParams();
  const courseId = typeof params?.id === "string" ? params.id : "";

  const { data: userData, isLoading: userLoading } =
    useLoadUserQuery(undefined, {});

  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!courseId) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/course/single-course/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setCurrentLesson(data.course.courseData[0] || null);
      })
      .catch(console.error);
  }, [courseId]);

  if (userLoading || !course || !currentLesson || !userData) {
    return (
      <div className="py-20 text-center text-gray-500 dark:text-gray-400">
        Loading course content...
      </div>
    );
  }

  // Toggle section visibility for accordion
  const toggleSection = (section: string) => {
    const newSet = new Set(visibleSections);
    if (newSet.has(section)) newSet.delete(section);
    else newSet.add(section);
    setVisibleSections(newSet);
  };

  // Group lessons by section
  const sections = Array.from(new Set(course.courseData.map((l) => l.videoSection)));

  return (
    <div className="dark:bg-[#0f0f1a] min-h-screen flex flex-col">
      <Header activeItem={1} open={false} setOpen={() => {}} route="/" setRoute={() => {}} />

      <div className="w-[95%] mx-auto py-6 flex flex-col lg:flex-row gap-6 flex-1 mt-20">

        {/* LEFT SIDE: Thumbnail + Video */}
        <div className="w-full lg:w-[68%] space-y-6">
          {course.thumbnail?.url && (
            <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300">
              <Image
                src={course.thumbnail.url}
                alt={course.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg p-4 border border-purple-100 dark:border-purple-900">
            <CoursePlayer
              videoUrl={currentLesson.videoUrl}
              title={currentLesson.title}
            />
          </div>
        </div>

        {/* RIGHT SIDE: Accordion Lessons */}
        <div className="w-full lg:w-[32%] bg-white dark:bg-[#1a1a2e] rounded-2xl shadow-lg border border-purple-100 dark:border-purple-900 p-6 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {course.name}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
            {course.description}
          </p>

          {sections.map((section) => {
            const lessonsInSection = course.courseData.filter(l => l.videoSection === section);
            const isVisible = visibleSections.has(section);
            const totalMinutes = lessonsInSection.reduce((sum, l) => sum + l.videoLength, 0);
            const totalHours = totalMinutes / 60;

            return (
              <div key={section} className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                {/* Section Header */}
                <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleSection(section)}>
                  <div>
                    <h3 className="text-lg font-semibold text-black dark:text-white">{section}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {lessonsInSection.length} Lessons · {totalMinutes < 60 ? `${totalMinutes} min` : `${totalHours.toFixed(2)} hr`}
                    </p>
                  </div>
                  <div className="text-black dark:text-white">
                    {isVisible ? <BsChevronUp /> : <BsChevronDown />}
                  </div>
                </div>

                {/* Lessons */}
                {isVisible && (
                  <div className="mt-2">
                    {lessonsInSection.map((lesson, idx) => {
                      const isActive = currentLesson._id === lesson._id;
                      return (
                        <div
                          key={lesson._id}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                            isActive
                              ? "bg-purple-600 text-white shadow-md"
                              : "hover:bg-purple-50 dark:hover:bg-purple-900/20 text-black dark:text-white"
                          }`}
                          onClick={() => setCurrentLesson(lesson)}
                        >
                          <MdOutlineOndemandVideo size={20} color={isActive ? "#fff" : "#1cdada"} />
                          <span className="flex-1 text-sm font-medium">{lesson.title}</span>
                          {!lesson.isFree && <IoLockClosedOutline className={`${isActive ? "text-white" : "text-gray-400"}`} />}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

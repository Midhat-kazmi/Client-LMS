"use client";

import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "../../../../redux/features/courses/courseApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const router = useRouter();

  const [active, setActive] = useState(0);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);

  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: "Untitled Section",
      videoPlayer: "html5",
      links: [{ title: "", url: "" }],
      suggestion: "",
    },
  ]);

  const [finalPayload, setFinalPayload] = useState<any>(null);

  const [createCourse, { isSuccess, error, isLoading }] =
    useCreateCourseMutation();

  // FINAL SUBMIT TO BACKEND
  const handleCourseCreate = async () => {
    if (!finalPayload) {
      toast.error("Course data is incomplete");
      return;
    }

    await createCourse(finalPayload);
  };

  // SUCCESS / ERROR HANDLING
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully!");
      router.push("/admin/courses");
    }

    if (error && "data" in error) {
      const err: any = error;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [isSuccess, error, router]);

  // FORMAT + VALIDATE DATA
  const handleSubmit = () => {
    if (!courseContentData.length) {
      toast.error("At least one video is required");
      setActive(2);
      return;
    }

    // FORMAT BENEFITS
    const formattedBenefits = benefits
      .filter((b) => b.title.trim() !== "")
      .map((b) => ({ title: b.title }));

    // FORMAT PREREQUISITES
    const formattedPrerequisites = prerequisites
      .filter((p) => p.title.trim() !== "")
      .map((p) => ({ title: p.title }));

    // FORMAT COURSE CONTENT
    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoLength: content.videoLength,
      videoSection: content.videoSection,
      videoPlayer: content.videoPlayer || "html5",
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));

    // FINAL PAYLOAD
    const payload = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: Number(courseInfo.price),
      estimatedPrice: Number(courseInfo.estimatedPrice),
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: formattedCourseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    console.log("FINAL COURSE PAYLOAD 👉", payload);

    setFinalPayload(payload);
    setActive(3);
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}

        {active === 3 && (
          <CoursePreview
            courseData={finalPayload}
            handleCourseCreate={handleCourseCreate}
            active={active}
            setActive={setActive}
          />
        )}
      </div>

      <div className="w-[20%] mt-[100px] h-screen fixed top-18 right-0 p-4">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;

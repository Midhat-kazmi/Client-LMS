"use client";

import React, { FC, useState } from "react";
import { styles } from "../../../styles/style";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  active,
  setActive,
  setCourseInfo,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCourseInfo({ ...courseInfo, thumbnail: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setCourseInfo({ ...courseInfo, thumbnail: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Course Information
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Name */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Course Name
          </label>
          <input
            type="text"
            required
            value={courseInfo.name || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Course Description
          </label>
          <textarea
            rows={6}
            value={courseInfo.description || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
          />
        </div>

        {/* Price & Estimated Price */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-600 font-medium mb-2">Price</label>
            <input
              type="number"
              value={courseInfo.price || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 font-medium mb-2">
              Estimated Price
            </label>
            <input
              type="number"
              value={courseInfo.estimatedPrice || ""}
              onChange={(e) =>
                setCourseInfo({
                  ...courseInfo,
                  estimatedPrice: e.target.value,
                })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">Tags</label>
          <input
            type="text"
            value={courseInfo.tags || ""}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, tags: e.target.value })
            }
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
          />
        </div>

        {/* Level & Demo URL */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-600 font-medium mb-2">Level</label>
            <input
              type="text"
              value={courseInfo.level || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-600 font-medium mb-2">Demo URL</label>
            <input
              type="text"
              value={courseInfo.demoUrl || ""}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <input type="file" hidden id="file" onChange={handleFileChange} />
          <label
            htmlFor="file"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition ${
              dragging ? "bg-teal-100 border-teal-400" : "border-gray-300"
            }`}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">
                Drag & Drop or Click to Upload Thumbnail
              </span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CourseInformation;

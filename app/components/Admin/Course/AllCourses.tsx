"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Modal, IconButton, Tooltip } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/redux/features/courses/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { styles } from "../../../styles/style";

const AllCourses = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState<string>("");

  /* ---------------- API ---------------- */
  const { isLoading, data } = useGetAllCourseQuery(undefined);

  const [deleteCourse, { isLoading: isDeleting, isSuccess, error }] =
    useDeleteCourseMutation();

  /* ---------------- Columns ---------------- */
  const columns = [
    { field: "id", headerName: "ID", flex: 0.4 },
    { field: "title", headerName: "Course Title", flex: 1.2 },
    { field: "ratings", headerName: "Ratings", flex: 0.4 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created", flex: 0.6 },

    {
      field: "edit",
      headerName: "",
      flex: 0.2,
      sortable: false,
      renderCell: (params: any) => (
        <Tooltip title="Edit course">
          <IconButton component={Link} href={`/admin/edit-course/${params.row.id}`}>
            <FiEdit2 className="text-indigo-600 dark:text-indigo-400" />
          </IconButton>
        </Tooltip>
      ),
    },

    {
      field: "delete",
      headerName: "",
      flex: 0.2,
      sortable: false,
      renderCell: (params: any) => (
        <Tooltip title="Delete course">
          <IconButton
            onClick={() => {
              setOpen(true);
              setCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className="text-red-500" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  /* ---------------- Rows ---------------- */
  const rows =
    data?.courses?.map((course: any) => ({
      id: course._id,
      title: course.name,
      ratings: course.ratings,
      purchased: course.purchased,
      created_at: format(course.createdAt),
    })) ?? [];

  /* ---------------- Delete Feedback ---------------- */
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success("Course deleted successfully");
    }

    if (error && "data" in error) {
      toast.error((error as any).data?.message || "Delete failed");
    }
  }, [isSuccess, error]);

  /* ---------------- Delete Handler ---------------- */
  const handleDelete = async () => {
    try {
      await deleteCourse(courseId).unwrap();
    } catch {
      // error already handled by RTK Query
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="mt-[120px]">
      <Box m="20px">
        <Box
          height="80vh"
          sx={{
            "& .MuiDataGrid-root": {
              borderRadius: "14px",
              backgroundColor: theme === "dark" ? "#1a1b2e" : "#ffffff",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#0f172a" : "#eef2ff",
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: theme === "dark" ? "#252644" : "#f8fafc",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark" ? "#0f172a" : "#eef2ff",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>

        {/* ---------------- Delete Modal ---------------- */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] bg-white dark:bg-slate-900 rounded-xl shadow-xl p-6 outline-none">
            <h2 className={`${styles.title} text-center`}>
              Delete this course?
            </h2>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-between mt-8">
              <button
                className={`${styles.button} bg-gray-300 dark:bg-gray-700`}
                onClick={() => setOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                className={`${styles.button} bg-red-600 hover:bg-red-700`}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default AllCourses;

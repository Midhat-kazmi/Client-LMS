import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    /* ---------------- CREATE ---------------- */
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/api/v1/course/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),

    /* ---------------- GET ALL (ADMIN) ---------------- */
    getAllCourse: builder.query({
      query: () => ({
        url: "/api/v1/course/admin/all",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Courses"],
    }),

    /* ---------------- DELETE ---------------- */
    deleteCourse: builder.mutation({
      query: (id: string) => ({
        url: `/api/v1/course/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),

    /* ---------------- EDIT ---------------- */
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/course/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),

    /* ---------------- USER COURSES ---------------- */
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "/api/v1/course/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Courses"],
    }),

    /* ---------------- DETAILS ---------------- */
    getCourseDetails: builder.query({
      query: (id: string) => ({
        url: `/api/v1/course/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseContent: builder.query({
      query: (id: string) => ({
        url: `/api/v1/course/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    /* ---------------- QUESTIONS ---------------- */
    addnewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "/api/v1/course/add-question",
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),

    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "/api/v1/course/add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),

    /* ---------------- REVIEWS ---------------- */
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `/api/v1/course/add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),

    addReplyInReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: "/api/v1/course/add-reply",
        method: "PUT",
        body: { comment, courseId, reviewId },
        credentials: "include" as const,
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCourseQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddnewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
} = courseApi;

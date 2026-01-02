import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000",
    credentials: "include",
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  // 🔥 REQUIRED for providesTags / invalidatesTags
  tagTypes: ["User", "Courses", "Notifications"],

  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000",
    credentials: "include",  // 🔥 REQUIRED FOR COOKIES
    prepareHeaders: (headers) => {
      // Add auth token if needed
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Courses"],
  endpoints: (builder) => ({}),
});

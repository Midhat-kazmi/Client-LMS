import { apiSlice } from "../api/apiSlice";
import { User } from "./authSlice";

interface LoginPayload {
  email: string;
  password: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface SignupResponse {
  user: User;
  token: string;
  activation_token: string;
  activation_code: string;
}

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ---------------- Login ----------------
    login: builder.mutation<{ user: User; token: string }, LoginPayload>({
      query: (credentials) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["User"], // mutation: ok
    }),

    // ---------------- Signup ----------------
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (data) => ({
        url: "/api/v1/user/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ---------------- Verify Account ----------------
    verifyAccount: builder.mutation<
      { message: string },
      { activation_code: string; activation_token: string }
    >({
      query: (body) => ({
        url: "/api/v1/user/activate-user",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),

    // ---------------- Load User ----------------
    loadUser: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/api/v1/user/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"], // query provides the tag
    }),

    // ---------------- Logout ----------------
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/api/v1/user/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"], // ✅ mutation invalidates tag
    }),

    // ---------------- Update Password ----------------
    updatePassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/api/v1/user/update-user-password",
        method: "PUT",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyAccountMutation,
  useLoadUserQuery,
  useLogoutMutation, 
  useUpdatePasswordMutation,
} = authApi;

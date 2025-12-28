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
  endpoints: (builder) => ({

    login: builder.mutation<{ user: User; token: string }, LoginPayload>({
      query: (credentials) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (data) => ({
        url: "/api/v1/user/register",
        method: "POST",
        body: data,
      }),
    }),

    verifyAccount: builder.mutation<
      { message: string },
      { activation_code: string; activation_token: string }
    >({
      query: (body) => ({
        url: "/api/v1/user/activate-user",
        method: "POST",
        body,
      }),
    }),

    loadUser: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/api/v1/user/me",
        method: "GET",
        credentials: "include",
      }),
    }),

    logout: builder.query<{ message: string }, void>({
      query: () => ({
        url: "/api/v1/user/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    // ⭐ FIXED UPDATE PASSWORD ENDPOINT
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
    }),

  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyAccountMutation,
  useLoadUserQuery,
  useLogoutQuery,
  useUpdatePasswordMutation,
} = authApi;

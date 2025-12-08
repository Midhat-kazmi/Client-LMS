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

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ user: User; token: string }, LoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    signup: builder.mutation<{ user: User; token: string }, SignupPayload>({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    verifyAccount: builder.mutation<
      { message: string },
      { activation_token: string; activation_code: string }
    >({
      query: ({ activation_token, activation_code }) => ({
        url: "/auth/verify",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),

    //  NEW: loadUser endpoint
    loadUser: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyAccountMutation,
  useLoadUserQuery,
} = authApi;

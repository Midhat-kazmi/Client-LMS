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
  activation_token: string;  // FIXED
  activation_code: string;   // FIXED
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
      query: ({ activation_code, activation_token }) => ({
        url: "/api/v1/user/activate-user",
        method: "POST",
        body: { activation_code, activation_token },
      }),
    }),

    loadUser: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/api/v1/user/me",
        method: "GET",
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
} = authApi;

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
}

interface SignupResponse {
  user: User;
  token: string;
  activation_token: string;
  activation_code: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // 🔐 LOGIN
    login: builder.mutation<{ user: User; token: string }, LoginPayload>({
      query: (credentials) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: ["User"], // ✅ OK for mutation
    }),

    // 📝 SIGNUP
    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (data) => ({
        url: "/api/v1/user/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"], // ✅ optional
    }),

    // ✅ VERIFY ACCOUNT
    verifyAccount: builder.mutation<
      { message: string },
      { activation_code: string; activation_token: string }
    >({
      query: (body) => ({
        url: "/api/v1/user/activate-user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // ✅ optional
    }),

    // 👤 LOAD USER
    loadUser: builder.query<{ user: User }, void>({
      query: () => ({
        url: "/api/v1/user/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"], // ✅ must use providesTags for query
    }),

    // 🚪 LOGOUT
    logout: builder.query<{ message: string }, void>({
      query: () => ({
        url: "/api/v1/user/logout",
        method: "POST",
        credentials: "include",
      }),
      providesTags: ["User"], // ✅ query must use providesTags
    }),

    // 🔑 UPDATE PASSWORD
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

    // 🖼️ UPDATE PROFILE PICTURE
    updateProfilePicture: builder.mutation<
      { success: boolean; user: User },
      FormData
    >({
      query: (formData) => ({
        url: "/api/v1/user/update-profile-picture",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["User"], // ✅ OK
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
  useUpdateProfilePictureMutation,
} = authApi;

import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  overrideExisting: true, // REQUIRED in Next.js App Router
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "/api/v1/users/update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),

    editProfile: builder.mutation({
      query: (name) => ({
        url: "/api/v1/users/update-user-info",
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),

    updatePassword: builder.mutation({
      query: ({ newPassword, oldPassword }) => ({
        url: "/api/v1/users/update-user-password",
        method: "PUT",
        body: { newPassword, oldPassword },
        credentials: "include" as const,
      }),
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/api/v1/users/get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: "/api/v1/users/update-user-role",
        method: "PUT",
        body: { id, role },
        credentials: "include" as const,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/v1/users/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});


export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  overrideExisting: true, 
  endpoints: (builder) => ({
    getAllNotifications: builder.query<{
      notifications: any[];
    }, void>({
      query: () => ({
        url: "/api/v1/notification/get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Notifications"],
    }),

    updateNotificationStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/notification/update-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} = notificationApi;

import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "/api/v1/order/get-orders",
        method: "GET",
        credentials: "include",
      }),
    }),

    // FIXED
    getStripePublishAbleKey: builder.query({
      query: () => ({
        url: "/api/v1/order/stripe-key",
        method: "GET",
        credentials: "include",
      }),
    }),

    //  FIXED
    createPaymentIntent: builder.mutation({
      query: (amount: number) => ({
        url: "/api/v1/order/payment-intent",
        method: "POST",
        body: { amount },
        credentials: "include",
      }),
    }),

    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "/api/v1/order/create-order",
        method: "POST",
        body: { courseId, payment_info },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreateOrderMutation,
  useCreatePaymentIntentMutation,
  useGetStripePublishAbleKeyQuery,
} = orderApi;

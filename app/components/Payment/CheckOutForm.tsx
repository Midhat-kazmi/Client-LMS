"use client";

import { styles } from "../../styles/style";
import { useLoadUserQuery } from "../../../redux/features/auth/authApi";
import { useCreateOrderMutation } from "../../../redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  setOpen: (value: boolean) => void;
  data: any;
  user: any;
  refetch: () => void;
};

const CheckOutForm = ({ data, user, refetch, setOpen }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [loadUser, setLoadUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [createOrder, { data: orderData, error }] =
    useCreateOrderMutation();

  // ✅ Correct RTK Query usage
  useLoadUserQuery(undefined, {
    skip: !loadUser,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed");
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (orderData) {
      refetch();

      socket.emit("notification", {
        title: "New Order",
        message: `You have a new order for ${data?.name}`,
        userId: user?._id,
      });

      setLoadUser(true);
      redirect(`/course-access/${data._id}`);
    }

    if (error && "data" in error) {
      const err = error as any;
      toast.error(err?.data?.message || "Something went wrong");
    }
  }, [orderData, error, data?._id, data?.name, refetch, user?._id]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />

      <PaymentElement id="payment-element" />

      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span className={`${styles.button} mt-2 h-[35px]!`}>
          {isLoading ? "Paying..." : "Pay Now"}
        </span>
      </button>

      {message && (
        <div className="text-red-500 font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;

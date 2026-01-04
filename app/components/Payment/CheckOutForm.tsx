"use client";

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { styles } from "../../styles/style";

type Props = {
  data: any;
  user: any;
  refetch: () => void;
  setOpen: (val: boolean) => void;
};

const CheckOutForm = ({ data, user, refetch, setOpen }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message || "Payment failed");
      setIsLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });
      refetch();
      setOpen(false);
      router.push(`/course-access/${data._id}`);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className={`${styles.button} w-full mt-4`}
      >
        {isLoading ? "Processing..." : `Pay ${data.price}$`}
      </button>
    </form>
  );
};

export default CheckOutForm;

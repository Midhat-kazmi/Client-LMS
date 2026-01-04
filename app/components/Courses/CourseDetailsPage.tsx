"use client";

import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import CheckOutForm from "../Payment/CheckOutForm";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import Ratings from "@/app/utils/Ratings";
import { AiOutlineUnorderedList } from "react-icons/ai";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Props = {
  data: any;
};

const CourseDetailsPage: React.FC<Props> = ({ data }) => {
  const { data: userData, refetch } = useLoadUserQuery();
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  // Header/Footer state placeholders for TS
  const [headerOpen, setHeaderOpen] = useState(false);
  const [headerRoute, setHeaderRoute] = useState("/");
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const fetchPaymentIntent = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/order/payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: data.price * 100 }),
          credentials: "include",
        }
      );

      const result = await res.json();
      if (result.success) setClientSecret(result.clientSecret);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBuyNow = async () => {
    if (!user) return alert("Please login first");
    await fetchPaymentIntent();
    setOpen(true);
  };

  return (
    <>
      {/* HEADER */}
      <Header
        activeItem={activeItem}
        open={headerOpen}
        setOpen={setHeaderOpen}
        route={headerRoute}
        setRoute={setHeaderRoute}
      />

      {/* MAIN CONTENT */}
      <div className="w-[92%] mx-auto py-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-[#0f0f1a] rounded-2xl shadow-xl border border-purple-100 dark:border-purple-900 p-6">

          {/* Thumbnail */}
          {data.thumbnail?.url && (
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={data.thumbnail.url}
                alt={data.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {data.name}
              </h1>

              <div className="flex items-center gap-4 mt-3">
                <Ratings rating={data.ratings} />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({data.purchased} students)
                </span>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {data.description}
              </p>

              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                  <AiOutlineUnorderedList size={20} />
                  <span>{data.courseData?.length} Lectures</span>
                </div>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="mt-8">
              <div className="flex items-end gap-3">
                <h2 className="text-3xl font-bold text-purple-600">
                  {data.price === 0 ? "Free" : `$${data.price}`}
                </h2>
                {data.estimatedPrice && (
                  <span className="line-through text-gray-400">
                    ${data.estimatedPrice}
                  </span>
                )}
              </div>

              <button
                onClick={handleBuyNow}
                className="mt-5 w-full bg-linear-to-r from-purple-600 to-purple-500 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:scale-[1.02] transition-all"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STRIPE MODAL */}
      {open && clientSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-[420px] max-w-[95%] bg-white dark:bg-[#0f0f1a] rounded-2xl p-6 shadow-2xl">
            <IoCloseOutline
              size={28}
              className="absolute right-4 top-4 cursor-pointer text-gray-600 dark:text-gray-300"
              onClick={() => setOpen(false)}
            />

            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckOutForm
                data={data}
                user={user}
                refetch={refetch}
                setOpen={setOpen}
              />
            </Elements>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default CourseDetailsPage;

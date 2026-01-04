"use client";

import React, { FC, useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/auth/authApi";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
};

const CourseDetails: FC<Props> = ({ data, stripePromise, clientSecret }) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined);
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const handleOrder = () => {
    if (!user) return alert("Please login first");
    if (!stripePromise || !clientSecret) return alert("Payment not ready yet");
    setOpen(true);
  };

  const isPurchased = user?.courses?.some((c: any) => c._id === data._id);

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Course Info */}
        <h1>{data.name}</h1>
        <Ratings rating={data.ratings} />

        <CoursePlayer videoUrl={data.demoUrl} title={data.name} />

        {/* Buy / Enter Course Button */}
        {isPurchased ? (
          <Link href={`/course-access/${data._id}`}>Enter Course</Link>
        ) : (
          <button onClick={handleOrder}>
            Buy Now {data.price ? `$${data.price}` : "Free"}
          </button>
        )}
      </div>

      {/* Payment Modal */}
      {open && stripePromise && clientSecret && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-xl w-[95%] max-w-[450px]">
            <div className="flex justify-end">
              <IoCloseOutline
                size={24}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckOutForm
                setOpen={setOpen}
                refetch={refetch}
                data={data}
                user={user}
              />
            </Elements>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;

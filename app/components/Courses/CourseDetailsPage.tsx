"use client";

import { FC, useEffect, useState } from "react";
import { styles } from "../../styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import CourseContentList from "./CourseContentList";
import { useLoadUserQuery } from "../../../redux/features/auth/authApi";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import Link from "next/link";
import Image from "next/image";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails: FC<Props> = ({ data, clientSecret, stripePromise }) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined);
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discount =
    data?.estimatedPrice && data.price
      ? ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100
      : 0;

  const isPurchased =
    user && user.courses?.some((c: any) => c._id === data._id);

  const handleOrder = () => {
    if (user) setOpen(true);
    else alert("Please login first");
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* LEFT SIDE */}
          <div className="w-full lg:w-[65%]">
            {/* Course Thumbnail */}
            {data.thumbnail?.url && (
              <div className="w-full h-[250px] relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={data.thumbnail.url}
                  alt={data.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Course Title */}
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Ratings rating={data.ratings} />
              <span className="font-medium">{data.reviews?.length || 0} Reviews</span>
            </div>

            {/* Benefits */}
            {data.benefits?.length > 0 && (
              <>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">What you’ll learn</h2>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-purple-50 p-3 rounded-lg">
                  {data.benefits.map((item: any, i: number) => (
                    <div key={i} className="flex gap-2 items-start">
                      <IoCheckmarkDoneOutline className="text-purple-500 mt-1" />
                      <p className="text-gray-700 text-sm">{item.title}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Course Content */}
            {data.courseData?.length > 0 && (
              <>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">Course Content</h2>
                <div className="mt-2 border border-purple-100 rounded-lg overflow-hidden">
                  <CourseContentList data={data.courseData} isDemo />
                </div>
              </>
            )}

            {/* Description */}
            {data.description && (
              <>
                <h2 className="mt-4 text-lg font-semibold text-gray-900">Course Description</h2>
                <p className="mt-2 text-gray-700 text-sm leading-relaxed">{data.description}</p>
              </>
            )}

            {/* Reviews */}
            {data.reviews?.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Student Reviews</h2>
                {data.reviews.map((review: any, i: number) => (
                  <div key={i} className="flex gap-3 p-3 mb-3 bg-white border border-purple-100 rounded-lg shadow-sm">
                    {/* Avatar */}
                    <div className="w-10 h-10 relative shrink-0">
                      {review.user?.avatar?.url ? (
                        <Image
                          src={review.user.avatar.url}
                          alt={review.user.name || "Avatar"}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 rounded-full w-full h-full flex items-center justify-center text-gray-500 text-xs">
                          N/A
                        </div>
                      )}
                    </div>

                    {/* Review Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{review.user?.name || "Anonymous"}</h4>
                        {review.user?.verified && <VscVerifiedFilled className="text-purple-500 text-sm" />}
                      </div>
                      <Ratings rating={review.rating} />
                      <p className="mt-1 text-gray-700 text-sm">{review.comment}</p>
                      <small className="text-gray-500 text-xs">{format(review.createdAt)}</small>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="w-full lg:w-[35%] sticky top-20">
            <div className="bg-white border border-purple-100 rounded-2xl shadow-lg p-4 flex flex-col gap-4">
              {/* Demo Video */}
              {data.demoUrl && <CoursePlayer videoUrl={data.demoUrl} title={data.name} />}

              {/* Price */}
              <div>
                <h2 className="text-xl font-bold text-purple-600">
                  {data.price === 0 ? "Free" : `$${data.price}`}
                </h2>
                {data.estimatedPrice && data.price && data.estimatedPrice > data.price && (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="line-through text-gray-400 text-sm">${data.estimatedPrice}</p>
                    <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                      {discount.toFixed(0)}% OFF
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              {isPurchased ? (
                <Link
                  href={`/course-access/${data._id}`}
                  className="mt-auto text-center bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition"
                >
                  Enter Course
                </Link>
              ) : (
                <button
                  onClick={handleOrder}
                  className="mt-auto w-full bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-2 rounded-xl transition"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-2xl w-[95%] max-w-[450px] shadow-xl relative">
            <IoCloseOutline
              className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-purple-500"
              size={26}
              onClick={() => setOpen(false)}
            />
            {stripePromise && clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckOutForm setOpen={setOpen} refetch={refetch} data={data} user={user} />
              </Elements>
            ) : (
              <div className="text-center text-gray-700">
                Unable to load payment. Please try again.
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;

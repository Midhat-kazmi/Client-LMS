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

const CourseDetails: FC<Props> = ({
  data,
  clientSecret,
  stripePromise,
}) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discount =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const isPurchased =
    user && user?.courses?.some((c: any) => c._id === data._id);

  const handleOrder = () => {
    if (user) setOpen(true);
    else alert("Please login first");
  };

  return (
    <>
      <div className="w-[90%] mx-auto py-6">
        <div className="flex flex-col 800px:flex-row gap-6">

          {/* LEFT */}
          <div className="w-full 800px:w-[65%]">
            <h1 className="text-2xl font-semibold">{data.name}</h1>

            <div className="flex items-center gap-3 mt-2">
              <Ratings rating={data.ratings} />
              <span>{data.reviews?.length} Reviews</span>
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              What you’ll learn
            </h2>

            {data.benefits?.map((item: any, i: number) => (
              <div key={i} className="flex gap-2 mt-2">
                <IoCheckmarkDoneOutline />
                <p>{item.title}</p>
              </div>
            ))}

            <h2 className="mt-6 text-xl font-semibold">
              Course Content
            </h2>

            <CourseContentList data={data.courseData} isDemo />

            <h2 className="mt-6 text-xl font-semibold">
              Course Description
            </h2>

            <p className="mt-2">{data.description}</p>

            {/* Reviews */}
            <div className="mt-6">
              {data.reviews?.map((review: any, i: number) => (
                <div key={i} className="my-4">
                  <div className="flex gap-3">
                    <Image
                      src={review.user?.avatar?.url}
                      alt=""
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div>
                      <h4>{review.user.name}</h4>
                      <Ratings rating={review.rating} />
                      <p>{review.comment}</p>
                      <small>{format(review.createdAt)}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full 800px:w-[35%] sticky top-[100px]">
            <CoursePlayer
              videoUrl={data.demoUrl}
              title={data.title}
            />

            <h2 className="mt-4 text-xl">
              {data.price === 0 ? "Free" : `$${data.price}`}
            </h2>

            <p className="line-through opacity-60">
              ${data.estimatedPrice}
            </p>

            <p>{discount.toFixed(0)}% OFF</p>

            {isPurchased ? (
              <Link
                href={`/course-access/${data._id}`}
                className={`${styles.button} mt-3`}
              >
                Enter Course
              </Link>
            ) : (
              <button
                onClick={handleOrder}
                className={`${styles.button} mt-3`}
              >
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-[500px]">
            <IoCloseOutline
              className="cursor-pointer ml-auto"
              size={30}
              onClick={() => setOpen(false)}
            />

            {stripePromise && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret }}
              >
                <CheckOutForm
                  setOpen={setOpen}
                  refetch={refetch}
                  data={data}
                  user={user}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;

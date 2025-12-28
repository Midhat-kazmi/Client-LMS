"use client";

import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "../../../redux/features/notifications/notificationsApi";
import { FC, useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: (val: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  /*  RTK Query – filter safely here */
 const query = useGetAllNotificationsQuery(undefined, {
  refetchOnMountOrArgChange: true,
});

const notifications =
  query.data?.notifications?.filter(
    (item: any) => item.status === "unread"
  ) ?? [];

const { refetch } = query;


  const [updateNotificationStatus] =
    useUpdateNotificationStatusMutation();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /*  Notification sound */
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "https://res.cloudinary.com/dasdrngo1/video/upload/v1715355770/notifications/mixkit-bubble-pop-up-alert-notification-2357_wbwviv.wav"
      );
    }
  }, []);

  const playNotificationSound = () => {
    audioRef.current?.play().catch(() => {});
  };

  /*  Socket listener */
  useEffect(() => {
    socket.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });

    return () => {
      socket.off("newNotification");
    };
  }, [refetch]);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen?.(false);
      }
    };

    if (open) document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setOpen]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-50">
      {/* 🔔 Notification bell */}
      <div
        className="relative cursor-pointer ml-4"
        onClick={() => setOpen?.(!open)}
      >
        <IoMdNotificationsOutline className="text-3xl text-gray-800 dark:text-white transition-transform duration-200 hover:scale-110" />

        {notifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-600 rounded-full w-5 h-5 text-[12px] flex items-center justify-center text-white font-semibold animate-pulse">
            {notifications.length}
          </span>
        )}
      </div>

      {/*  Notification dropdown */}
      {open && (
        <div
          ref={dropdownRef}
          className="w-[360px] max-h-[60vh] overflow-y-auto dark:bg-[#111C43] bg-white shadow-2xl absolute top-16 right-0 rounded-xl border border-gray-200 dark:border-[#2d3a4ea1]"
        >
          <h5 className="text-center text-[20px] font-semibold text-gray-900 dark:text-white p-4 border-b dark:border-[#ffffff33]">
            Notifications
          </h5>

          {notifications.length === 0 ? (
            <p className="text-center p-4 text-gray-500 dark:text-gray-300">
              No new notifications
            </p>
          ) : (
            notifications.map((item: any) => (
              <div
                key={item._id}
                className="flex flex-col p-3 hover:bg-purple-50 dark:hover:bg-[#2d3a4ea1] border-b border-gray-200 dark:border-[#ffffff20]"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <button
                    className="text-sm text-purple-600 hover:underline"
                    onClick={() =>
                      handleNotificationStatusChange(item._id)
                    }
                  >
                    Mark as read
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-200 text-sm mb-1">
                  {item.message}
                </p>

                <p className="text-gray-400 text-[12px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;

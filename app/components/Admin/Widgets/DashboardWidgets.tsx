import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "../../../../redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
};

/* ---------------- Circular Progress ---------------- */

const CircularProgressWithLabel: FC<{ open?: boolean; value?: number }> = ({
  open,
  value = 0,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
    </Box>
  );
};

/* ---------------- Dashboard Widgets ---------------- */

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] =
    useState<any>(null);
  const [userComparePercentage, setUserComparePercentage] =
    useState<any>(null);

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    //  Correct loading guard
    if (isLoading || ordersLoading) return;

    //  Safe access with optional chaining + fallback
    const usersLastTwoMonths =
      data?.users?.last12Months?.slice(-2) ?? [];

    const ordersLastTwoMonths =
      ordersData?.orders?.last12Months?.slice(-2) ?? [];

    if (usersLastTwoMonths.length !== 2 || ordersLastTwoMonths.length !== 2)
      return;

    const usersCurrentMonth = usersLastTwoMonths[1].count;
    const usersPreviousMonth = usersLastTwoMonths[0].count;

    const ordersCurrentMonth = ordersLastTwoMonths[1].count;
    const ordersPreviousMonth = ordersLastTwoMonths[0].count;

    const usersPercentChange =
      usersPreviousMonth !== 0
        ? ((usersCurrentMonth - usersPreviousMonth) /
            usersPreviousMonth) *
          100
        : 100;

    const ordersPercentChange =
      ordersPreviousMonth !== 0
        ? ((ordersCurrentMonth - ordersPreviousMonth) /
            ordersPreviousMonth) *
          100
        : 100;

    setUserComparePercentage({
      currentMonth: usersCurrentMonth,
      previousMonth: usersPreviousMonth,
      percentChange: usersPercentChange,
    });

    setOrdersComparePercentage({
      currentMonth: ordersCurrentMonth,
      previousMonth: ordersPreviousMonth,
      percentChange: ordersPercentChange,
    });
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="mt-7.5 min-h-screen">
      <div className="grid 800px:grid-cols-[75%,25%]">
        <div className="pt-2.5 800px:p-7">
          <UserAnalytics isDashboard />
        </div>

        <div className="pt-5 800px:pt-10 p-1.25 800px:block flex items-center justify-between">
          {/* Orders Widget */}
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-10 mr-2.5 800px:my-8">
            <div className="flex items-center p-5 justify-between">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-black text-2xl" />
                <h5 className="pt-0.5 font-Poppins dark:text-white text-black text-lg">
                  {ordersComparePercentage?.currentMonth ?? 0}
                </h5>
                <h5 className="py-0.5 font-Poppins dark:text-[#45CBA0] text-black text-lg font-normal">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    ordersComparePercentage?.percentChange > 0 ? 100 : 0
                  }
                  open={open}
                />
                <h5 className="text-center pt-1">
                  {ordersComparePercentage
                    ? `${ordersComparePercentage.percentChange > 0 ? "+" : ""}${ordersComparePercentage.percentChange.toFixed(
                        2
                      )}%`
                    : "0%"}
                </h5>
              </div>
            </div>
          </div>

          {/* Users Widget */}
          <div className="w-full dark:bg-[#111C43] rounded-sm shadow 800px:my-8 my-10">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-black text-2xl" />
                <h5 className="pt-0.5 font-Poppins dark:text-white text-black text-lg">
                  {userComparePercentage?.currentMonth ?? 0}
                </h5>
                <h5 className="py-0.5 font-Poppins dark:text-[#45CBA0] text-black text-lg font-normal">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-1">
                  {userComparePercentage
                    ? `${userComparePercentage.percentChange > 0 ? "+" : ""}${userComparePercentage.percentChange.toFixed(
                        2
                      )}%`
                    : "0%"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid 800px:grid-cols-[65%,35%] -mt-5">
        <div className="dark:bg-[#111c43] w-[95%] 800px:w-[94%] mt-0 h-[30vh] 800px:h-[40vh] shadow-sm m-auto">
          <OrdersAnalytics isDashboard />
        </div>
        <div className="p-5">
          <h5 className="dark:text-white text-black text-lg font-normal font-Poppins pb-3 mt-20">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;

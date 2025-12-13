"use client";
import React, { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import avatarDefault from "../../../../public/assets/istockphoto-2192680774-1024x1024.jpg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

interface ItemProps {
  title: string;
  to: string;
  icon: React.ReactElement;
  selected: string;
  setSelected: (title: string) => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
    className="transition-colors duration-300 hover:text-purple-600!"
  >
    <Typography className="text-[16px]! font-Poppins!">{title}</Typography>
    <Link href={to} />
  </MenuItem>
);

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    window.location.href = "/";
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: theme === "dark" ? "#1E0733 !important" : "#F5F3FF !important",
        },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item:hover": { color: "#7C3AED !important" },
        "& .pro-menu-item.active": { color: "#7C3AED !important" },
        "& .pro-inner-item": { padding: "8px 35px 8px 20px !important", opacity: 1 },
        "& .pro-menu-item": { color: `${theme !== "dark" && "#1F2937"}` },
      }}
      className="bg-purple-50! dark:bg-[#1E0733]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 9999,
          width: isCollapsed ? "80px" : "280px",
          transition: "width 0.3s",
          boxShadow: "2px 0 12px rgba(0,0,0,0.1)",
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND COLLAPSE ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "15px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="10px">
                <Link href="/" className="block">
                  <h3 className="text-[25px]! font-Poppins! font-bold uppercase text-purple-600">
                    E-Learning
                  </h3>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <ArrowBackIosIcon className="text-purple-600" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER PROFILE */}
          {!isCollapsed && (
            <Box mb="30px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user?.avatar ? user.avatar.url : avatarDefault}
                  className="w-20 h-20 rounded-full shadow-lg"
                  style={{
                    borderRadius: "50%",
                    border: "3px solid #7C3AED",
                  }}
                />
              </Box>
              <Box textAlign="center" mt={2}>
                <Typography
                  variant="h4"
                  className="text-[20px]! font-semibold text-gray-800 dark:text-white"
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="text-[16px]! text-gray-500 dark:text-gray-300 capitalize mt-1"
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          {/* SIDEBAR MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "6%"}>
            <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              className="text-[18px]! text-gray-600 dark:text-gray-300 font-normal! mt-5 mb-2"
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item title="Users" to="/admin/users" icon={<GroupsIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Invoices" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              className="text-[18px]! text-gray-600 dark:text-gray-300 font-normal! mt-5 mb-2"
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item title="Create Course" to="/admin/create-course" icon={<VideoCallIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Live Courses" to="/admin/courses" icon={<OndemandVideoIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              className="text-[18px]! text-gray-600 dark:text-gray-300 font-normal! mt-5 mb-2"
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item title="Hero" to="/admin/hero" icon={<WebIcon />} selected={selected} setSelected={setSelected} />
            <Item title="FAQ" to="/admin/faq" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Categories" to="/admin/categories" icon={<WysiwygIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              className="text-[18px]! text-gray-600 dark:text-gray-300 font-normal! mt-5 mb-2"
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h6"
              className="text-[18px]! text-gray-600 dark:text-gray-300 font-normal! mt-5 mb-2"
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item title="Courses Analytics" to="/admin/courses-analytics" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Orders Analytics" to="/admin/orders-analytics" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Users Analytics" to="/admin/users-analytics" icon={<ManageHistoryIcon />} selected={selected} setSelected={setSelected} />

            {/* LOGOUT BUTTON */}
            <Box mt={8}>
              <div onClick={logoutHandler}>
                <Item title="Logout" to="/" icon={<ExitToAppIcon />} selected={selected} setSelected={setSelected} />
              </div>
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

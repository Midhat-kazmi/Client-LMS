"use client";

import React, { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

import {
  HomeOutlined as HomeOutlinedIcon,
  PeopleOutlined as PeopleOutlinedIcon,
  ReceiptOutlined as ReceiptOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  MapOutlined as MapOutlinedIcon,
  Groups as GroupsIcon,
  OndemandVideo as OndemandVideoIcon,
  VideoCall as VideoCallIcon,
  Web as WebIcon,
  Quiz as QuizIcon,
  Wysiwyg as WysiwygIcon,
  ManageHistory as ManageHistoryIcon,
  ExitToApp as ExitToAppIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  ArrowBackIos as ArrowBackIosIcon,
} from "@mui/icons-material";

import avatarDefault from "../../../../public/assets/istockphoto-2192680774-1024x1024.jpg";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

// Menu Item Component
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
    className="transition-all duration-300 hover:text-purple-600 font-medium"
  >
    <Typography className="text-sm md:text-[16px]">{title}</Typography>
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
        "& .pro-inner-item": { padding: "10px 35px 10px 20px !important" },
        "& .pro-menu-item": { color: `${theme !== "dark" && "#1F2937"}` },
      }}
      className="bg-purple-50 dark:bg-[#1E0733] shadow-lg"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "80px" : "280px",
          transition: "width 0.3s",
          zIndex: 9999,
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
                  <h3 className="text-xl md:text-2xl font-bold uppercase text-purple-600">
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
            <Box mb="30px" mx="auto" textAlign="center">
              <Image
                alt="profile-user"
                width={100}
                height={100}
                src={user?.avatar ? user.avatar.url : avatarDefault}
                className="w-24 h-24 rounded-full shadow-md mx-auto"
                style={{ border: "3px solid #7C3AED" }}
              />
              <Typography className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                {user?.name}
              </Typography>
              <Typography className="text-sm text-gray-500 dark:text-gray-300 capitalize mt-1">
                - {user?.role}
              </Typography>
            </Box>
          )}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "6%"}>
            {/* Dashboard */}
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data Section */}
            {!isCollapsed && (
              <Typography className="text-sm md:text-[16px] text-gray-600 dark:text-gray-300 mt-5 mb-2">
                Data
              </Typography>
            )}
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Content Section */}
            {!isCollapsed && (
              <Typography className="text-sm md:text-[16px] text-gray-600 dark:text-gray-300 mt-5 mb-2">
                Content
              </Typography>
            )}
            <Item
              title="Create Course"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Customization Section */}
            {!isCollapsed && (
              <Typography className="text-sm md:text-[16px] text-gray-600 dark:text-gray-300 mt-5 mb-2">
                Customization
              </Typography>
            )}
            <Item title="Hero" to="/admin/hero" icon={<WebIcon />} selected={selected} setSelected={setSelected} />
            <Item title="FAQ" to="/admin/faq" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Categories" to="/admin/categories" icon={<WysiwygIcon />} selected={selected} setSelected={setSelected} />

            {/* Controllers */}
            {!isCollapsed && (
              <Typography className="text-sm md:text-[16px] text-gray-600 dark:text-gray-300 mt-5 mb-2">
                Controllers
              </Typography>
            )}
            <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />

            {/* Analytics */}
            {!isCollapsed && (
              <Typography className="text-sm md:text-[16px] text-gray-600 dark:text-gray-300 mt-5 mb-2">
                Analytics
              </Typography>
            )}
            <Item title="Courses Analytics" to="/admin/courses-analytics" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Orders Analytics" to="/admin/orders-analytics" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Users Analytics" to="/admin/users-analytics" icon={<ManageHistoryIcon />} selected={selected} setSelected={setSelected} />

            {/* Logout */}
            <Box mt={8} textAlign="center">
              <div onClick={logoutHandler} className="cursor-pointer">
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

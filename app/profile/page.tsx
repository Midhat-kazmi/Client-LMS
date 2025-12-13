"use client";

import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer";
import { useLoadUserQuery } from "../../redux/features/auth/authApi";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  const { data, isLoading } = useLoadUserQuery();
  const user = data?.user;

  if (isLoading || !user) return null;

  return (
    <div className="min-h-screen">
      <Heading
        title={`${user.name} Profile - ELearning`}
        description="ELearning is a platform for online learning and education."
        keywords="ELearning, online learning, education, courses"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />

      <Profile user={user} />

      <Footer />
    </div>
  );
};

export default Page;

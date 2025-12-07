'use client'

import React, { FC, useState } from 'react';
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState<string>(""); // <--- Add this

  return (
    <>
      <Heading
        title="ELearning"
        description="ELearning is a platform for online learning and education."
        keywords="ELearning, online learning, education, courses, tutorials, training"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}          
        setRoute={setRoute}   
      />
      <Hero />

      <Footer />
    </>
  );
};

export default Page;

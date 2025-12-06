'use client'

import React, { FC, useState } from 'react';
import Heading from "./utils/Heading";
import Header from "./components/Header";

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
        route={route}          // <--- Add this
        setRoute={setRoute}    // <--- Add this
      />
    </>
  );
};

export default Page;

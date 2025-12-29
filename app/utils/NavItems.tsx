"use client";
import Link from "next/link";

export const NavItems = ({
  isMobile,
  activeItem,
}: {
  isMobile?: boolean;
  activeItem?: number;
}) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Policy", path: "/policy" },
  ];

  return (
    <nav className={isMobile ? "flex flex-col gap-6 mt-6" : "hidden md:flex gap-8"}>
      {links.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={`font-medium transition-all
            ${
              activeItem === index
                ? "text-purple-600 dark:text-purple-400"
                : "text-black dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
            }
          `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

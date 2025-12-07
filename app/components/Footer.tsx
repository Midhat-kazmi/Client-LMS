"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 text-black dark:text-white border-t border-gray-300 dark:border-gray-700 pt-10 pb-6 relative">
      {/* Grid Section */}
      <div className="w-[95%] max-w-[1200px] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses"
                  className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-gray-800 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Social Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.youtube.com/"
                  target="_blank"
                  className="text-gray-800 dark:text-gray-300 hover:text-red-500 transition"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/"
                  target="_blank"
                  className="text-gray-800 dark:text-gray-300 hover:text-pink-500 transition"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/im-Toqeer-506"
                  target="_blank"
                  className="text-gray-800 dark:text-gray-300 hover:text-gray-500 transition"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Stay up-to-date with our latest courses and programming tips by subscribing to our newsletter.
            </p>
            <Link
              href="mailto:ksyedamidhat@gmail.com"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Connect
            </Link>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-10"></div>

        {/* Copyright */}
        <p className="text-center text-gray-800 dark:text-gray-300 mt-4 text-sm">
          &copy; 2025 ELearning | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;

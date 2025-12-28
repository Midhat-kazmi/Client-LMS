"use client";

import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";
import { styles } from "../../styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState<FAQItem[]>([]);

  const {
    data,
    isLoading,
    isError,
  } = useGetHeroDataQuery("faq", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    // Safely handle null / undefined API data
    setQuestions(data?.layout?.faq ?? []);
  }, [data]);

  const toggleQuestion = (id: string) => {
    setActiveQuestion((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">Loading FAQs...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-red-500">Failed to load FAQs</p>
      </div>
    );
  }

  return (
    <div>
      <div className="w-[90%] 800px:w-[80%] m-auto">
        <h1 className={`${styles.title} 800px:text-[40px] mt-20`}>
          Frequently Asked Questions
        </h1>

        <div className="mt-12">
          <div className="space-y-8">
            {questions.length === 0 && (
              <p className="text-center text-gray-500">
                No FAQs available.
              </p>
            )}

            {questions.map((q, index) => (
              <div
                key={q._id}
                className={`${
                  index !== 0 && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-medium text-black dark:text-white">
                      {q.question}
                    </span>
                    <span className="ml-6 shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>

                {activeQuestion === q._id && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base font-Poppins text-black dark:text-white">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
    </div>
  );
};

export default FAQ;

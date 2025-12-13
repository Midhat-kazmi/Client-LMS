import React, { FC } from "react";

interface CourseCardProps {
  item: any;
  isProfile?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({ item, isProfile }) => {
  return <div>Course Card</div>;
};

export default CourseCard;

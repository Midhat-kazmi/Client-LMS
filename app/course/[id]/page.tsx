import CourseDetailsPage from "../../components/Courses/CourseDetailsPage";

type Props = {
  params: { id: string };
};

const Page = async (props: Props) => {
  // Unwrap params safely
  const params = await Promise.resolve(props.params);
  const { id } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/course/single-course/${id}`,
      { cache: "no-store" } // ensures fresh data
    );

    if (!res.ok) throw new Error("Failed to fetch course");

    const data = await res.json();

    return <CourseDetailsPage data={data.course} />;
  } catch (err) {
    console.error("Error fetching course:", err);
    return <div className="text-center p-10 text-red-500">
      Failed to load course.
    </div>;
  }
};

export default Page;

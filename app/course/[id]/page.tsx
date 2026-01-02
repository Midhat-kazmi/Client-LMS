import CourseDetails from "../../components/Courses/CourseDetailsPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params; 

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/course/single-course/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch course");
  }

  const data = await res.json();

  return (
    <CourseDetails
      data={data.course}
      stripePromise={data.stripePromise}
      clientSecret={data.clientSecret}
    />
  );
};

export default Page;

import CourseDetails from "../../components/Courses/CourseDetailsPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params; //  REQUIRED in Next 15

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/course/${id}`,
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

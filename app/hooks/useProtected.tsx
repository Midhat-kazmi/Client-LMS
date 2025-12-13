import { redirect } from "next/navigation";
import { ReactNode } from "react";
import useAuth from "./useAuth";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until loading is done
  if (loading) return <div>Loading...</div>;

  // After loading, if no user → redirect
  if (!isAuthenticated) redirect("/");

  // Otherwise render the page
  return children;
};

export default Protected;

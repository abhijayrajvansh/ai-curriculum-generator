import React from "react";
import ViewCurriculum from "@/components/ViewCurriculum";
import { CurriculumIdType } from "@/actions/getCurriculumServerAction";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

interface PageProps {
  params: CurriculumIdType;
}

const page = async ({ params }: PageProps) => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const userIsAlreadyLoggedIn = await isAuthenticated();

  if (!userIsAlreadyLoggedIn) redirect('/');

  const user = await getUser();
  const username = `${user.given_name} ${user.family_name}`;
  const email = user.email
  
  return <ViewCurriculum email={email} params={params} username={username} />;
};

export default page;

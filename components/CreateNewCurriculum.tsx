import React from "react";
import CurriculumForm from "./CurriculumForm";
import Sidebar from "./Sidebar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function CreateNewCurriculum () {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const username = `${user.given_name} ${user.family_name}`;
  const email = user.email;

  return (
    <>
      <Sidebar email={email} username={username}/>
      <div className="wrapper h-screen sm:ml-[60px] lg:ml-64">
        <CurriculumForm userEmail={email}/>
      </div>
    </>
  );
};

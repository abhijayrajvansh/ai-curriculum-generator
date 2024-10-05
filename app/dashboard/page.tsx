import Dashboard from "@/components/pages/Dashboard";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function page() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  
  const isAlreadyLoggedIn = await isAuthenticated();
  if (!isAlreadyLoggedIn) { redirect("/") }
  
  const user = await getUser();
  const username = `${user.given_name} ${user.family_name}`;
  const email = user.email

  return <Dashboard username={username} email={email}/>;
}

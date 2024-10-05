import Home from "@/components/pages/Home";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

const page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const userIsAlreadyLoggedIn = await isAuthenticated();

  return <Home userIsAlreadyLoggedIn={userIsAlreadyLoggedIn} />;
};

export default page;

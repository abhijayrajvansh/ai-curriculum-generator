"use client";

import React from "react";


import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const Home = ({
  userIsAlreadyLoggedIn,
}: {
  userIsAlreadyLoggedIn: boolean;
}) => {

  const router = useRouter()

  return (
    <>
      {!userIsAlreadyLoggedIn ? (
        <div className="flex space-x-4 justify-end bg-[#fafaf3] p-5">
          <LoginLink className="bg-white border border-black text-black rounded-md py-2 px-4">
            Login
          </LoginLink>
          <RegisterLink className="bg-primary rounded-md text-white py-2 px-4">
            Get Started
          </RegisterLink>
        </div>
      ) : (
        <div className="flex space-x-4 justify-end bg-[#fafaf3] p-5">
          <Button onClick={() => router.push('/dashboard')}
            size={"lg"}
            variant={"outline"}
            className="rounded-md border border-black font-medium text-md py-5 px-4 hover:bg-primary hover:text-white hover:border-white"
          >
            Dashboard
          </Button>
        </div>
      )}
      <div className="h-[90vh] bg-[#fafaf3] flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-[#254230] mb-4">
            Build your course curriculum with AI
          </h1>

          {/* Subheading */}
          <p className="text-lg text-[#254230] mb-12">
            Introducing AI course curriculum generator. Unblock yourself. Get
            creative. Build faster.
          </p>

          {/* CTA Button */}
          {!userIsAlreadyLoggedIn ? (
            <RegisterLink className="bg-primary px-5 py-4 rounded-md text-white font-medium text-lg">
              Get Started
            </RegisterLink>
          ) : (
            <Button onClick={() => router.push('/dashboard')}
              size={"lg"}
              className="py-6 text-md font-medium"
            >
              Continue to Dashboard
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

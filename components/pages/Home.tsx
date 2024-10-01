'use client'

import React from "react";
import Header from "../Header";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Home = () => {
  return (
    <>
      <Header />
      <div className="h-screen bg-[#fafaf3] flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-[#254230] mb-4">
            Build your course curriculum with AI
          </h1>

          <LoginLink>Sign in</LoginLink>
          

          {/* Subheading */}
          <p className="text-lg text-[#254230] mb-12">
            Introducing AI course curriculum generator. Unblock yourself. Get
            creative. Build faster.
          </p>

          {/* CTA Button */}
          <RegisterLink className="bg-primary px-5 py-4 rounded-md text-white font-medium text-lg">
            Get Started
          </RegisterLink>
        </div>
      </div>
    </>
  );
};

export default Home;

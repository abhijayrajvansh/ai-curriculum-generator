import Link from "next/link";
import React from "react";
import Header from "../Header";
import { Button } from "../ui/button";

const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#fafaf3] flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#254230] mb-4">
          Build your course curriculum with AI
        </h1>

        {/* Subheading */}
        <p className="text-lg text-[#254230] mb-6">
          Introducing AI course curriculum generator. Unblock yourself. Get creative. Build faster.
        </p>

        {/* CTA Button */}
        <Button asChild className="mt-4 bg-primary text-white text-lg py-6 px-5 rounded-md" size={'lg'}>
          <Link href={'/login'}>
            Get Started
          </Link>
        </Button>
      </div>
    </div>
    </>
  );
};

export default Home;

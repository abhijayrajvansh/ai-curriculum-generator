import Link from "next/link";
import React from "react";
import Header from "../Header";
import { Button } from "../ui/button";

const Home = () => {
  return (
    <>
      <Header />
      <div className="wrapper bred">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center">
      <div className="max-w-4xl px-4 py-10">
        {/* Heading Section */}
        <h1 className="text-4xl font-bold mb-4">Creativity, minus the writer's block</h1>
        <p className="text-gray-600 mb-10">
          Sometimes getting started is the hardest part—until now. Just follow these steps.
        </p>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Step 1 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Step 1: Name your course</h3>
            <p className="text-gray-500">
              When naming your new course, check "Help me generate a course outline."
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Step 2: Get your outline</h3>
            <p className="text-gray-500">
              Enter a brief description of your course. The generator will create an outline for you in just a few moments.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Step 3: Make it yours</h3>
            <p className="text-gray-500">
              Keep the momentum going. Use our flexible curriculum builder to rearrange, edit, and make it yours.
            </p>
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-8">
          <Button>Click Here to Start!</Button>
        </div>
      </div>
    </div>
      </div>
    </>
  );
};

export default Home;

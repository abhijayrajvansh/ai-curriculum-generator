import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="wrapper mt-10">
      <div>Home</div>
      <div className="text-blue-600 mt-10 underline underline-offset-2">
        <Link href={'/dashboard'}>dashboard</Link>
      </div>
    </div>
  );
};

export default Home;

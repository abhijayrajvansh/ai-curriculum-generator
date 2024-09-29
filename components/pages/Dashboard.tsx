import React from "react";
import CreateNewCurriculum from "../CreateNewCurriculum";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="wrapper mt-20">
      Dashboard
      <Link className="text-blue-600 underline underline-offset-2" href={'/dashboard/new'}>create new curriculum</Link>
    </div>
  );
};

export default Dashboard;

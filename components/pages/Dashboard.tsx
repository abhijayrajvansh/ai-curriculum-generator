"use client";

import React from "react";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { BiPlusCircle } from "react-icons/bi";
import { CurriculumList } from "../CurriculumList";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleAddNew = () => {
    router.push("/dashboard/new");
  };

  return (
    <>
      <Sidebar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col px-4 justify-center mx-auto w-full mt-12 sm:ml-[60px] lg:ml-64">
          <div className="flex justify-between">
            <div className="mb-5 ">
              <div className="text-4xl font-semibold">Welcome back!</div>
              <p className="font-medium text-sm text-gray-600">
                ready to upskill yourself?
              </p>
            </div>
            <Button
              onClick={handleAddNew}
              className="bg-primary space-x-3"
            >
              <BiPlusCircle size={20} />
              <p>Add New</p>
            </Button>
          </div>

          <CurriculumList />

        </div>
      </div>
    </>
  );
};

export default Dashboard;

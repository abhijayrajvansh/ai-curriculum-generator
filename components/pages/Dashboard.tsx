import React from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { BiPlusCircle } from "react-icons/bi";
import { CurriculumList } from "../CurriculumList";


const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col px-4 justify-center mx-auto w-full mt-12 sm:ml-[60px] lg:ml-64">
          <div className="flex justify-between">
            <div className="mb-5 ">
              <div className="text-4xl font-semibold">
                Welcome back!
              </div>
              <p className="font-medium text-sm text-gray-600">ready to upskill yourself?</p>
            </div>
            <Button className="bg-[#5f6c5f]/90 hover:bg-[#5f6c5f]">
              <div className="flex gap-3">
                <BiPlusCircle size={20} />
                <Link href={"/dashboard/new"}>Add new</Link>
              </div>
            </Button>
          </div>

          

            <CurriculumList />


          </div>
        </div>
    </>
  );
};

export default Dashboard;

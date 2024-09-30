import React from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { Button } from "../ui/button";
import { BiPlusCircle } from "react-icons/bi";

const curriculum_data = [
  {
    srn: "1",
    curriculumName: "Curriculum 1",
    createdAt: "Abhijay",
    createdBy: "30th September 2024",
  },
  {
    srn: "1",
    curriculumName: "Curriculum 1",
    createdAt: "Abhijay",
    createdBy: "30th September 2024",
  }
];

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <div className="flex items-center justify-center">
        <div className="flex flex-col px-4 justify-center mx-auto w-full mt-12 sm:ml-[60px] lg:ml-64">
          <div className="flex justify-between">
            <div className="mb-5 ">
              <div className="text-4xl font-semibold">
                Welcome, Abhijay!
              </div>
              <p className="font-medium text-sm text-gray-600">ready to upskill yourself</p>
            </div>
            <Button className="bg-[#5f6c5f]/90 hover:bg-[#5f6c5f]">
              <div className="flex gap-3">
                <BiPlusCircle size={20} />
                <Link href={"/dashboard/new"}>Add new</Link>
              </div>
            </Button>
          </div>

          <div className="flex w-full justify-around py-3 mb-2 font-semibold items-center bg-[#c88889]/50 rounded-md">
            <div>Sr. No:</div>
            <div>Curriculum Name</div>
            <div>Created By</div>
            <div>Created At</div>
          </div>

          {/* list of all curriculums */}
          
          
            {curriculum_data.map((item) => (
              <div className="flex w-full justify-around py-3 items-center bg-[#4e564e] text-white rounded border border-background">
                <div>{item.srn}</div>
                <div>{item.curriculumName}</div>
                <div>{item.createdAt}</div>
                <div>{item.createdBy}</div>
              </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default Dashboard;

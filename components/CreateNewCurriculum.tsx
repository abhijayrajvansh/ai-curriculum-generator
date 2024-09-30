import React from "react";
import CurriculumForm from "./CurriculumForm";
import Sidebar from "./Sidebar";

const CreateNewCurriculum = () => {
  return (
    <>
      <Sidebar />
      <div className="wrapper h-screen sm:ml-[60px] lg:ml-64">
        <CurriculumForm />
      </div>
    </>
  );
};

export default CreateNewCurriculum;

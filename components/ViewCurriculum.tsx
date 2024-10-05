"use client";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Markdown from "markdown-to-jsx";
import { FaFileExport } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fetchCurriculumData } from "@/actions/getCurriculumServerAction";
import { useEffect, useRef, useState } from "react";
import { CurriculumIdType } from "@/actions/getCurriculumServerAction";

interface PageProps {
  params: CurriculumIdType;
  username: string | null
  email: string | null
}

const ViewCurriculum = ({ params, username, email }: PageProps) => {
  
  const router = useRouter();

  const [curriculumData, setCurriculumData] = useState({
    curriculumName: "",
    curriculumData: ""
  });

  useEffect(() => {
    async function viweCurriculum() {
      const response = await fetchCurriculumData(params);

      setCurriculumData({
        curriculumName: response[0].curriculumName,
        curriculumData: response[0].curriculumData,

      })
    }
    viweCurriculum();
  }, []);

  const contentRef = useRef<HTMLDivElement | null>(null);

  const printContent = (filename: string) => {
    if (contentRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(`
        <html>
          <head>
            <title>${filename}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
            </style>
          </head>
          <body>
            ${contentRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  return (
    <div>
      <Sidebar username={username} email={email} />
      <div className="flex items-center justify-center">
        <div className="flex flex-col px-4 w-full mt-12 h-screen gap-3 sm:ml-[60px] lg:ml-64">
          <div className="text-4xl font-semibold">{curriculumData.curriculumName}</div>

          <p className="block text-sm font-medium text-gray-600 mb-3">
 
          </p>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={"outline"}
              onClick={() => router.push("/dashboard")}
              className="w-fit bg-white"
            >
              Back
            </Button>

            <Button type="button" className="bg-primary" onClick={() => printContent(curriculumData.curriculumName)}>
              <div className="flex gap-3">
                Download
                <FaFileExport size={20} className="text-white" />
              </div>
            </Button>

          </div>

          <div className="w-full">
            {/* ref={contentRef} down */}
            <div className="w-full bg-white p-20" ref={contentRef}>
              <Markdown>{curriculumData.curriculumData}</Markdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCurriculum;

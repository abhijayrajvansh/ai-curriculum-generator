"use client";

import { useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaFileExport } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChat } from "ai/react";
import Markdown from "markdown-to-jsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TextEditor from "./TextEditor";

const CurriculumForm = () => {
  const [step, setStep] = useState(1);

  const handleContinue = () => setStep((curr) => curr + 1);
  const handlePrevious = () => setStep((curr) => curr - 1);

  const [formParams, setFormParams] = useState({
    curriculumName: "",
    topic: "",
    industry: "",
    level: "",
    duration: "",
  });

  const generatedPdfRef = useRef<HTMLDivElement | null>(null);

  const exportAsPDF = (fileName: string): void => {
    const input = generatedPdfRef.current;
    let pdfFileName = fileName;

    if (!pdfFileName) pdfFileName = "curriculum";

    if (!input) return; // Add a check to ensure input is not null or undefined

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 30;

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save(`${pdfFileName}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF: ", error);
      });
  };

  const handleChange = (name: string, value: string | number) => {
    setFormParams((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const prompt = `Generate a comprehensive learning roadmap and curate a curriculum for a ${formParams.level} student learning how to master ${formParams.topic}. The curriculum must follow ${formParams.industry} industry standards and should span ${formParams.duration}, including theory modules and practical labs. Each day should cover one specific task with hands-on exercises. Return the curriculum in HTML format`;

  const { messages, setInput, input, handleSubmit, stop, isLoading } = useChat({
    api: "/api/create-curriculum",
  });

  const handleSave = () => {
    setInput(prompt);
    handleContinue();
  };

  const handleGenerate = () => {
    handleSubmit();
    handleContinue();
  };

  return (
    <div className="flex justify-center">
      {step === 1 && (
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <div className="text-4xl font-semibold">Name your Curriculum</div>
          <p>What would you like to name your roadmap?</p>

          <p className="block text-sm font-medium text-gray-600 mt-5">
            Curriculum title
          </p>
          <Input
            type="text"
            name="curriculumName"
            value={formParams.curriculumName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="e.g. Chess for Dummies"
            className="bg-white"
          />

          <Button
            type="button"
            onClick={handleContinue}
            className="bg-[#5f6c5f] hover:bg-[#5f6c5f]/90 w-fit"
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <div className="text-4xl font-semibold">Create an outline</div>
          <p>
            Use the power of AI to generate an outline based on a description of
            your ccourse.
          </p>

          <div className="space-y-2">
            <p className="block text-sm font-medium text-gray-600 mt-5">
              Enter your topic
            </p>
            <Input
              type="text"
              name="topic"
              value={formParams.topic}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="what you want to learn?"
              className="bg-white"
            />
          </div>

          <div className="space-y-2 flex items-center gap-3">
            <div className="w-full space-y-2">
              <p className="block text-sm font-medium text-gray-600">
                Enter duration
              </p>
              <Input
                type="text"
                name="duration"
                value={formParams.duration}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="e.g. 15 days or 4 weeks"
                className="bg-white"
              />
            </div>
            <div className="w-full space-y-2 pb-2">
              <label className="block text-sm font-medium text-gray-600">
                Select your current level:
              </label>
              <Select onValueChange={(value) => handleChange("level", value)}>
                <SelectTrigger className="w-full p-2 border border-gray-300 bg-white rounded-md">
                  <SelectValue
                    className="bg-white"
                    placeholder="Select level"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Enter industry
            </label>
            <Input
              type="text"
              name="industry"
              value={formParams.industry}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="e.g. Human resource"
              className="bg-white"
            />
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Button
              type="button"
              variant={"outline"}
              onClick={handlePrevious}
              className="w-fit bg-white"
            >
              Back
            </Button>

            <Button
              type="button"
              onClick={() => handleSave()}
              className="bg-[#5f6c5f] hover:bg-[#5f6c5f]/90 w-fit"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <div className="text-4xl font-semibold">Confirm your outline</div>
          <div className="block text-sm font-medium text-gray-600 mb-5">
            kindly confirm check all your parameters.
          </div>
          <div className="p-4 rounded-md sm:min-w-[500px] bg-white border">
            <div>
              <span className="text-lg font-semibold">
                Curriculum Name:&nbsp;&nbsp;
              </span>
              <span className="text-lg">{formParams.curriculumName}</span>
            </div>
            <div>
              <span className="text-lg font-semibold">
                Course Topic:&nbsp;&nbsp;
              </span>
              <span className="text-lg">{formParams.topic}</span>
            </div>
            <div>
              {formParams.industry && (
                <div>
                  <span className="text-lg font-semibold">
                    Industry:&nbsp;&nbsp;
                  </span>
                  <span className="text-lg">{formParams.industry}</span>
                </div>
              )}
            </div>
            <div className="text-lg">
              <span className="font-semibold">
                Your current level:&nbsp;&nbsp;
              </span>
              {formParams.level}
            </div>
            <div className="text-lg">
              <span className="font-semibold">
                Duration of training:&nbsp;&nbsp;
              </span>
              {formParams.duration}
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Button
              type="button"
              variant={"outline"}
              onClick={handlePrevious}
              className="w-fit bg-white"
            >
              Back
            </Button>

            <Button variant={'destructive'} onClick={() => console.log(input)}>log prompt </Button>

            <Button
              type="button"
              onClick={handleGenerate}
              className="bg-[#5f6c5f] hover:bg-[#5f6c5f]/90 w-fit"
            >
              Generate Curriculum
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex h-screen xl:w-[800px]">
          <div className="flex flex-col w-full mt-10 h-screen gap-3">
            <div className="text-4xl font-semibold">Generating curriculum</div>
            {isLoading ? (
              <p className="block text-sm font-medium text-gray-600 mb-3">
                sit back & relax, your curriculum is being generated...
              </p>
            ) : (
              <p className="block text-sm font-medium text-gray-600 mb-3">
                your curriculum is generated, make sure your save it!
              </p>
            )}

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant={"outline"}
                onClick={handlePrevious}
                className="w-fit bg-white"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => exportAsPDF(formParams.curriculumName)}
                className="bg-[#5f6c5f]/90 hover:bg-[#5f6c5f]"
                disabled={isLoading}
              >
                <div className="flex gap-3">
                  Export as pdf
                  <FaFileExport size={20} className="text-white" />
                </div>
              </Button>
              <Button
                type="button"
                variant={"destructive"}
                onClick={stop}
                className="w-fit"
              >
                Stop Generating
              </Button>
            </div>

            {messages.map((message) => (
              <div key={message.id}>
                {message.role !== "user" && (
                  <TextEditor
                    curriculumName={formParams.curriculumName}
                    messages={message.content}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumForm;

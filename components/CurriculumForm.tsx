"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
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
import Markdown from 'markdown-to-jsx'

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

  const handleChange = (name: string, value: string | number) => {
    setFormParams((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const prompt = `Generate a comprehensive learning roadmap and curate a curriculum for a ${formParams.level} student learning how to master ${formParams.topic}. The curriculum must follow ${formParams.industry} industry standards and should span ${formParams.duration}, including theory modules and practical labs. Each day should cover one specific task with hands-on exercises.`;

  const { messages, setInput, input, handleSubmit, stop } = useChat({
    api: "/api/create-curriculum",
  });

  const handleSave = () => {
    setInput(prompt);
    handleContinue();
  };

  const handleGenerate = () => {
    handleSubmit();
    handleContinue();
  }

  return (
    <div className="w-full flex justify-center">
      {step === 1 && (
        <div className="flex flex-col w-1/2 gap-3">
          <div>Name your course</div>
          <p>What would you like to name your curriculum?</p>

          <p className="block text-sm font-medium">Curriculum title</p>
          <Input
            type="text"
            name="curriculumName"
            value={formParams.curriculumName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            placeholder="e.g. Chess for Dummies"
          />

          <Button type="button" onClick={handleContinue} className="w-fit">
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col w-1/2 gap-3">
          <div>Create an outline</div>
          <p>
            Use the power of AI to generate an outline based on a description of
            your ccourse.
          </p>

          <div className="space-y-2 mt-3">
            <p className="block text-sm font-medium">Enter your topic</p>
            <Input
              type="text"
              name="topic"
              value={formParams.topic}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="what you want to learn?"
            />
          </div>

          <div className="space-y-2 mt-3 flex items-center gap-3">
            <div className="w-full space-y-2">
              <p className="block text-sm font-medium">Enter duration</p>
              <Input
                type="text"
                name="duration"
                value={formParams.duration}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                placeholder="e.g. 15 days or 4 weeks"
              />
            </div>
            <div className="w-full space-y-2 pb-2">
              <label className="block text-sm font-medium">
                Select your current level:
              </label>
              <Select onValueChange={(value) => handleChange("level", value)}>
                <SelectTrigger className="w-full p-2 border border-gray-300 rounded-md">
                  <SelectValue placeholder="Select level" />
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
            <label className="block text-sm font-medium py-2">
              Enter industry
            </label>
            <Input
              type="text"
              name="industry"
              value={formParams.industry}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              placeholder="e.g. Human resource"
            />
          </div>

          <div className="flex items-center gap-3 mt-5">
            <Button
              type="button"
              variant={"outline"}
              onClick={handlePrevious}
              className="w-fit"
            >
              Back
            </Button>

            <Button
              type="button"
              onClick={() => handleSave()}
              className="w-fit"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="mb-3">Confirm your outline</div>
          <div>
            <div>Curriculum Name: {formParams.curriculumName}</div>
            <div>Course Topic: {formParams.topic}</div>
            <div>
              {formParams.industry && (
                <div>Industry: {formParams.industry}</div>
              )}
            </div>
            <div>Your current level: {formParams.level}</div>
            <div>Duration of training: {formParams.duration}</div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <Button
              type="button"
              variant={"outline"}
              onClick={handlePrevious}
              className="w-fit"
            >
              Back
            </Button>

            <Button variant={'secondary'} onClick={() => console.log(input)}>log prompt</Button>

            <Button
              type="button"
              onClick={handleGenerate}
              className="w-fit"
            >
              Generate Curriculum
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex w-full h-screen">
          <div className="w-1/2">
            <div className="mb-3">
              Generating curriculum using current outline
            </div>
            <div>
              <div>Curriculum Name: {formParams.curriculumName}</div>
              <div>Course Topic: {formParams.topic}</div>
              <div>
                {formParams.industry && (
                  <div>Industry: {formParams.industry}</div>
                )}
              </div>
              <div>Your current level: {formParams.level}</div>
              <div>Duration of training: {formParams.duration}</div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <Button
                type="button"
                variant={"outline"}
                onClick={handlePrevious}
                className="w-fit"
              >
                Back
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
          </div>
          <div className="w-1/2 px-2">
            {messages.map((message) => (
              <div key={message.id}>
                {message.role !== "user" && <Markdown>{message.content}</Markdown>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumForm;

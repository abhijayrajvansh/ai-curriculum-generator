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

const CurriculumForm = () => {
  const [step, setStep] = useState(1);

  const [formParams, setFormParams] = useState({
    curriculumName: "",
    topic: "",
    level: "",
    duration: "",
  });

  const prompt = `Generate a comprehensive learning roadmap for a ${formParams.level} student learning how to master ${formParams.topic}. The curriculum should span ${formParams.duration}, including theory modules and practical labs. Each day should cover one specific task with hands-on exercises.
  `;

  const handleSubmit = () => {
    console.log(prompt);
  };

  const handleChange = (name: string, value: string | number) => {
    setFormParams((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleContinue = () => setStep((prev) => prev + 1);

  return (
    <div className="w-full   flex justify-center">
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
            <p className="block text-sm font-medium">Enter your target</p>
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

          <Button type="button" onClick={handleSubmit} className="w-fit">
            Generate Curriculum
          </Button>
        </div>
      )}
    </div>
  );
};

export default CurriculumForm;

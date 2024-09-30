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
import Markdown from "markdown-to-jsx";

const CurriculumForm = () => {
  const [step, setStep] = useState(1);

  const handleContinue = () => setStep((curr) => curr + 1);
  const handlePrevious = () => setStep((curr) => curr - 1);

  const [formParams, setFormParams] = useState({
    curriculumName: "sample curriculum name",
    topic: "software engineering",
    industry: "technical",
    level: "beginner",
    duration: "4 weeks",
  });

  const handleChange = (name: string, value: string | number) => {
    setFormParams((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const prompt = `Generate a comprehensive learning roadmap and curate a curriculum for a ${formParams.level} student learning how to master ${formParams.topic}. The curriculum must follow ${formParams.industry} industry standards and should span ${formParams.duration}, including theory modules and practical labs. Each day should cover one specific task with hands-on exercises.`;

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
    <div className="max-w-screen-2xl flex justify-center">
      {step === 1 && (
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <div className="text-4xl font-medium">Name your Curriculum</div>
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

          <Button type="button" onClick={handleContinue} className="w-fit">
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <div className="text-4xl font-medium">Create an outline</div>
          <p>
            Use the power of AI to generate an outline based on a description of
            your ccourse.
          </p>

          <div className="space-y-2 mt-3">
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

          <div className="space-y-2 mt-3 flex items-center gap-3">
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
              className="w-fit"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col w-full lg:w-1/2 gap-3">
          <div className="text-4xl font-medium">Confirm your outline</div>
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

            {/* <Button className="bg-yellow-200" variant={'outline'} onClick={() => console.log(input)}>log prompt</Button> */}

            <Button type="button" onClick={handleGenerate} className="w-fit">
              Generate Curriculum
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex w-full h-screen">
          <div className="flex flex-col w-full mt-10 h-screen lg:w-1/2 gap-3">
            <div className="text-4xl font-medium">Generating curriculum</div>
            <div className="block text-sm font-medium text-gray-600 mb-5">
              hooray! your curriculum is being generated, please wait...
            </div>
            <div className="p-4 rounded-md sm:min-w-[500px] bg-white border w-fit">
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
                disabled={isLoading}
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
              <Button
                type="button"
                onClick={stop}
                // className="bg-[#5f6c5f]/90 hover:bg-[#5f6c5f]"
                disabled
              >
                Save
              </Button>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <div>
              Software Engineering Learning Roadmap (4 Weeks) Week 1:
              Fundamentals of Software Engineering Day 1: Introduction to
              Software Engineering Theory Module: Definition, Scope, and
              Importance of Software Engineering Practical Lab: Create a simple
              project plan using Agile methodologies Hands-on Exercise: Plan a
              small software project (e.g., a calculator app) Day 2: Programming
              Fundamentals Theory Module: Data Types, Variables, Control
              Structures, Functions, and Object-Oriented Programming (OOP)
              concepts Practical Lab: Write simple programs in Python or Java to
              practice basic programming concepts Hands-on Exercise: Implement a
              calculator program using OOP principles Day 3: Software
              Development Life Cycle (SDLC) Theory Module: Phases of SDLC,
              including Requirements Gathering, Analysis, Design,
              Implementation, Testing, and Maintenance Practical Lab: Create a
              simple use case diagram using UML notation Hands-on Exercise: Plan
              a small project's requirements gathering phase Day 4: Version
              Control Systems Theory Module: Introduction to Git, GitHub, and
              other version control systems Practical Lab: Set up a Git
              repository and practice basic branching and merging techniques
              Hands-on Exercise: Create a simple commit history using Git Week
              2: Programming Languages and Data Structures Day 5: Data
              Structures Theory Module: Arrays, Linked Lists, Stacks, Queues,
              Trees (Binary Search Trees, AVL Trees), and Graphs Practical Lab:
              Implement basic data structures in Python or Java Hands-on
              Exercise: Write a program to implement a stack using an array Day
              6: Object-Oriented Programming (OOP) Concepts Theory Module:
              Inheritance, Polymorphism, Encapsulation, and Abstraction
              Practical Lab: Implement OOP concepts in Python or Java Hands-on
              Exercise: Create a simple class hierarchy using inheritance Day 7:
              Functional Programming Theory Module: Introduction to functional
              programming principles, including recursion, higher-order
              functions, and immutable data structures Practical Lab: Write
              programs in Haskell or Lisp that demonstrate functional
              programming concepts Hands-on Exercise: Implement a recursive
              function in Python or Java
            </div>
            {messages.map((message) => (
              <div key={message.id}>
                {message.role !== "user" && (
                  <Markdown>{message.content}</Markdown>
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

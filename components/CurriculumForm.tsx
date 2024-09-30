"use client";

import { useState } from "react";
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

const CurriculumForm = () => {
  const [step, setStep] = useState(4);

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
    <div className="flex justify-center bred">
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

          <Button type="button" onClick={handleContinue} className="w-fit">
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
              <label className="block text-sm font-semibold text-gray-600">
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

            {/* <Button className="bg-yellow-200" variant={'outline'} onClick={() => console.log(input)}>log prompt </Button> */}

            <Button type="button" onClick={handleGenerate} className="w-fit">
              Generate Curriculum
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex h-screen xl:w-[800px]">
          <div className="flex flex-col w-full mt-10 h-screen gap-3">
            <div className="text-4xl font-semibold">Generating curriculum</div>
            <div className="block text-sm font-medium text-gray-600 mb-3">
              sit back & relax, your curriculum is being generated...
            </div>

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
                variant={"destructive"}
                onClick={stop}
                className="w-fit"
              >
                Stop Generating
              </Button>
              <Button
                type="button"
                // onClick={} add export function here...
                className="bg-[#5f6c5f]/90 hover:bg-[#5f6c5f]"
                disabled
              >
                <div className="flex gap-3">
                  Save and Export
                  <FaFileExport size={20} className="text-white" />
                </div>
              </Button>
            </div>

            {/* {messages.map((message) => (
              <div key={message.id}>
                {message.role !== "user" && (
                  <div className="border p-1 bg-white">
                    <Markdown>{message.content}</Markdown>
                  </div>
                  
                )}
              </div>
            ))} */}

            <div className="border p-1 bg-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut tempore sequi esse eum? Voluptate sapiente accusamus ipsa adipisci nobis minus dignissimos quaerat natus nesciunt! Magni odit saepe, incidunt ab deleniti at eos dicta ratione ut nam, rerum aut ea magnam aliquid temporibus fugiat porro sit, itaque ex nobis numquam? Consequatur iusto, corrupti dolorum dolor pariatur facere modi quo, dicta optio accusantium, cupiditate maxime ea? Consequuntur, sed ducimus. Laboriosam pariatur, autem temporibus necessitatibus ex eaque exercitationem aperiam ipsam distinctio praesentium facilis quam! Accusamus eius nesciunt ab, dolore tempore cumque facilis at neque iste eos adipisci repudiandae. Dolore facere quibusdam optio maxime rerum eius aliquid sed ad ab, dolorum architecto, aut quam. Obcaecati, qui! Voluptates, tempore. Vel explicabo illum accusamus quaerat aspernatur ex eius! Distinctio consectetur saepe assumenda inventore veniam laborum asperiores natus. Veritatis, quam nemo? Sequi aspernatur natus unde beatae numquam dicta doloremque aliquid, eligendi explicabo sed quam laudantium quae veritatis adipisci alias eaque earum asperiores ab aliquam incidunt eveniet. Possimus ducimus necessitatibus minus quibusdam corrupti numquam repudiandae nam non amet ad quidem quisquam iusto, dignissimos corporis iure, pariatur consequatur blanditiis commodi suscipit quia quasi? Adipisci exercitationem quaerat beatae, odit quidem fugit veritatis. Neque debitis voluptates blanditiis voluptatum nam ipsa laudantium rerum dolor aliquid alias. Nemo excepturi repellendus quo recusandae saepe, consectetur ipsa sequi aut, libero explicabo dolorem. Voluptate iste dignissimos dolorem reprehenderit similique facere illo dolore, autem id. Minus necessitatibus molestiae earum quo aliquid fugit alias deserunt, excepturi rerum adipisci enim maxime quae nihil ut facilis corrupti tempora dolor pariatur tenetur eaque nesciunt? Non excepturi, doloremque incidunt libero quos enim laborum molestias sint velit facere repellat ex placeat cumque maiores esse. Quaerat natus possimus animi repellendus, eaque nam doloribus veritatis aperiam voluptatibus eos. Esse dignissimos voluptas nemo autem voluptatum deleniti! Consequatur vel distinctio fugiat asperiores placeat culpa quasi voluptate labore.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumForm;

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
    let pdfFileName = fileName

    if (!pdfFileName) pdfFileName = 'curriculum';

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

          <Button type="button" onClick={handleContinue} className="bg-[#5f6c5f] hover:bg-[#5f6c5f]/90 w-fit">
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

            {/* <Button className="bg-yellow-200" variant={'outline'} onClick={() => console.log(input)}>log prompt </Button> */}

            <Button type="button" onClick={handleGenerate} className="bg-[#5f6c5f] hover:bg-[#5f6c5f]/90 w-fit">
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
                onClick={() => exportAsPDF(formParams.curriculumName)}
                className="bg-[#5f6c5f]/90 hover:bg-[#5f6c5f]"
                disabled={isLoading}
              >
                <div className="flex gap-3">
                  Export as pdf
                  <FaFileExport size={20} className="text-white" />
                </div>
              </Button>
            </div>

            {/* {messages.map((message) => (
              <div key={message.id}>
                {message.role !== "user" && (
                  <div
                    ref={generatedPdfRef}
                    className="border p-1 bg-white my-5"
                  >
                    <Markdown>{message.content}</Markdown>
                  </div>
                )}
              </div>
            ))} */}

            {/* dummy pdf sample */}
            <div ref={generatedPdfRef} className="border p-1 bg-white my-5">
              Comprehensive Learning Roadmap: Mastering Full-Stack Development
              and Landing a $100K Remote Job Offer Duration: 30 days Objective:
              By the end of this program, you will have gained the skills and
              knowledge required to become a proficient full-stack developer and
              increase your chances of landing a $100K remote job offer. Day
              1-5: Fundamentals of Programming and Data Structures Day 1: Topic:
              Introduction to programming Task: Set up a coding environment
              (IDE, text editor, etc.) Exercise: Complete online tutorials on
              basic syntax, data types, and control structures (e.g.,
              Codecademy, FreeCodeCamp) Day 2: Topic: Data structures (arrays,
              linked lists, stacks, queues) Task: Implement basic data structure
              operations in a programming language Exercise: Write code to
              implement stack, queue, and linked list operations Day 3: Topic:
              Algorithms (sorting, searching, recursion) Task: Understand the
              time and space complexity of common algorithms Exercise: Analyze
              and optimize a simple algorithm for sorting an array Day 4: Topic:
              Object-Oriented Programming (OOP) concepts Task: Implement basic
              OOP principles in a programming language Exercise: Create a simple
              class with inheritance, polymorphism, and encapsulation Day 5:
              Topic: Review of fundamental concepts Task: Complete online
              quizzes or coding challenges to reinforce understanding Exercise:
              Participate in online communities (e.g., HackerRank, LeetCode) to
              practice problem-solving Day 6-10: Front-end Development Day 6:
              Topic: Introduction to front-end development Task: Set up a basic
              HTML/CSS project Exercise: Create a simple web page with CSS
              styling and layout Day 7: Topic: JavaScript basics (variables,
              data types, functions) Task: Implement basic JavaScript
              functionality in an HTML project Exercise: Write code to create
              interactive elements (e.g., buttons, forms) using JavaScript Day
              8: Topic: Front-end frameworks (React, Angular, Vue.js) Task:
              Choose a framework and set up a new project Exercise: Complete
              tutorials or coding challenges for the chosen framework Day 9:
              Topic: CSS preprocessors (Sass, Less) Task: Implement basic Sass
              or Less functionality in an HTML project Exercise: Write code to
              create reusable styles using Sass or Less Day 10: Topic: Review of
              front-end concepts Task: Complete online quizzes or coding
              challenges to reinforce understanding Exercise: Participate in
              online communities (e.g., Frontend Masters, CSS-Tricks) to
              practice problem-solving Day 11-15: Back-end Development Day 11:
              Topic: Introduction to back-end development Task: Set up a basic
              Node.js project Exercise: Create a simple server using Express.js
              and handle HTTP requests Day 12: Topic: Database fundamentals
              (relational, NoSQL) Task: Choose a database type and set up a new
              project Exercise: Complete tutorials or coding challenges for the
              chosen database

              Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati est, voluptates placeat architecto quia facere rerum voluptatum a nobis nostrum doloribus omnis vitae tenetur eos ad sunt consequatur harum neque voluptatibus recusandae. Nulla, minus. Obcaecati, aperiam vero. Recusandae, deleniti? Cupiditate vero quod voluptatibus illum voluptatum, omnis dolorem tempore quas et temporibus quam cumque a laboriosam totam veniam itaque! Optio et maiores laboriosam ducimus, ut autem. Sapiente officiis id, alias eum cumque soluta debitis recusandae praesentium modi tenetur autem doloribus distinctio quae aliquid expedita reiciendis. Voluptatum quas hic ducimus, odit odio saepe cumque molestias quisquam laborum natus corrupti! Sunt sint temporibus omnis illo, aliquam dolore quos doloribus rem exercitationem saepe placeat. Repellendus magni nesciunt voluptates suscipit inventore, facere aliquid sint doloribus nobis culpa amet accusantium fugit voluptatibus quae. Ipsum, ea velit asperiores ullam sequi harum. Velit quas officiis accusantium cumque nobis repudiandae facere voluptatem sequi vero inventore labore in tempore, error maxime quisquam consequuntur ullam nulla dignissimos dicta excepturi eius, animi odio? Doloribus rem eum at, quisquam hic alias et odio est assumenda. Quam aliquam ratione, numquam quidem dolorem cum soluta nisi distinctio consequatur. Repellendus provident vel quae accusantium aliquid quas nam! Ex autem quidem, corporis quasi praesentium sit dolorum illum, quis voluptatum ratione at dicta impedit odit blanditiis consectetur molestias officia quo! Hic fugit maiores, at itaque voluptatum beatae adipisci? Reprehenderit nemo ab dolore ratione tenetur eligendi odit dicta explicabo aliquam libero illum quis excepturi adipisci aut id corrupti, quos deserunt inventore ipsa iure unde quaerat dolorem eaque similique. Dignissimos aspernatur tempora porro labore a. Non harum corrupti, esse animi officiis voluptates doloremque quidem. Quas, voluptatem vitae inventore blanditiis expedita harum, aperiam repudiandae voluptatibus provident voluptate deserunt enim, eveniet quae laudantium ea. Voluptates iste, veniam voluptate esse, atque accusamus qui saepe nisi obcaecati ratione natus animi laborum consequatur ex eum adipisci ad sapiente necessitatibus numquam expedita reiciendis corporis id? Culpa at maiores inventore dicta eaque explicabo rem in consequatur voluptatibus facere, quas eius dignissimos quidem voluptates ea sunt asperiores saepe sed excepturi laboriosam omnis? Dolorem quis distinctio totam, iste illo repudiandae consequatur, beatae in culpa pariatur fugiat nesciunt velit iusto quisquam atque, officia accusamus temporibus reiciendis ratione unde quos voluptatum corporis! Aliquid, voluptas amet earum nisi placeat eius facilis beatae ipsa sit maiores veritatis soluta voluptatem fuga delectus saepe neque dolor officia accusantium ipsam debitis minus ut tempore veniam. Illo sint consequuntur culpa, possimus sequi amet commodi magnam eligendi quod ut pariatur asperiores rem voluptatem velit laudantium accusamus, dicta exercitationem inventore labore voluptas perferendis. Eius illo quas earum ut doloremque minus quaerat aspernatur, minima tenetur commodi cupiditate esse? Quae tempore, quidem obcaecati ipsa tenetur esse voluptatibus rerum perferendis dolore quas, eum voluptatum magnam beatae et, consectetur quia sunt asperiores soluta alias! Adipisci et alias reiciendis ratione provident fugiat exercitationem, quasi, perspiciatis sapiente nesciunt ullam doloribus? Excepturi id repudiandae repellendus eaque fugiat commodi ducimus. Eligendi voluptas amet doloremque placeat molestiae atque voluptatibus! Rem harum deserunt eius incidunt earum, quos quasi enim natus facilis nisi quaerat eos facere modi asperiores quidem esse!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurriculumForm;

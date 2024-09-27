"use client";

import { useChat } from "ai/react";
import React from "react";

const CurriculumForm = () => {
  const { messages, handleInputChange, handleSubmit, input } = useChat();

  const level = "beginner";
  const topic = "software engineering";
  const duration = "4 months";

  const prompt = `
    Generate a comprehensive learning roadmap for a ${level} student learning ${topic}. 
    The curriculum should span ${duration} weeks, including theory modules and practical labs.
    Each day should cover one specific task with hands-on exercises.
  `;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="fixed bottom-0 left-1/2 m -translate-x-1/2 transfor w-full py-8 bg-background flex items-center justify-center gap-3">
          <input
            className="dark:bg-transparent/30 w-[70%] sm:w-1/2 sm:p-3 p-2 border-2 rounded-xl shadow-md text-black dark:text-white "
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button>send</button>
        </div>
      </form>
    </div>
  );
};

export default CurriculumForm;

"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import Markdown from "markdown-to-jsx";

interface TextEditorProps {
  curriculumName: string;
  messages: string;
}

const TextEditor = ({ curriculumName, messages }: TextEditorProps) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      
      quill.setContents([]);

      const htmlContent = `
        ${messages}
      `;

      quill.clipboard.dangerouslyPasteHTML(htmlContent);
    }
  }, [quill, curriculumName, messages]);

  return (
    <div className="w-full bg-white h-screen">
      <div ref={quillRef} />
    </div>
  );
};

export default TextEditor;

"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface TextEditorProps {
  curriculumName: string;
  messages: string;
}

const TextEditor = ({ curriculumName, messages }: TextEditorProps) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill && messages) {
      // Get current HTML content of the editor
      const currentContent = quill.root.innerHTML;
      const htmlContent = messages;

      // Only update if the new content is different
      if (currentContent.trim() !== htmlContent.trim()) {
        quill.clipboard.dangerouslyPasteHTML(htmlContent);
      }
    }
  }, [quill, messages]); // Removing curriculumName from dependencies

  return (
    <div className="w-full bg-white h-screen">
      <div ref={quillRef} />
    </div>
  );
};

export default TextEditor;

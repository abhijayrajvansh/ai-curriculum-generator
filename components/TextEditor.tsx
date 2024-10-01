"use client";

import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface TextEditorProps {
  messages: string;
  generatedPdfRef: React.RefObject<any>
}

const TextEditor = ({ messages, generatedPdfRef }: TextEditorProps) => {
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill && messages) {
      const currentContent = quill.root.innerHTML;
      const htmlContent = messages;

      if (currentContent.trim() !== htmlContent.trim()) {
        quill.clipboard.dangerouslyPasteHTML(htmlContent);
      }
    }
  }, [quill, messages]);

  return (
    <div className="w-full bg-white h-screen">
      <div className="refference can go here" ref={generatedPdfRef}>
        <div ref={quillRef} />
      </div>
    </div>
  );
};

export default TextEditor;

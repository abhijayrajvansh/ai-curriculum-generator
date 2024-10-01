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

  // Convert Markdown to HTML
  const markdownToHtml = (markdown: string) => {
    return (
      <Markdown options={{ forceBlock: true }}>
        {markdown}
      </Markdown>
    );
  };

  useEffect(() => {
    if (quill) {
      // Clear the editor's content before updating it
      quill.setContents([]);

      // Safely paste the new content
      const formattedContent = markdownToHtml(messages).props.children;
      const htmlContent = `
        <h1>${curriculumName}</h1>
        ${formattedContent}
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

'use client';

import { useRef } from "react";
import ReactQuill from "react-quill";

import QuillDynamicWrapper from "@/app/_components/QuilldynamicWrapper";

export default function KnowledgeAddFormQuill() {
  const quillRef = useRef<ReactQuill>(null);

  return (
    <QuillDynamicWrapper
      className="mt-3 h-[300px]"
      forwardedRef={quillRef}
      theme="snow"
    />
  );
}
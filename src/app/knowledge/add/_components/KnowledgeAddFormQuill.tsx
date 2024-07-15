'use client';

import QuillDynamicWrapper from "@/app/_components/QuilldynamicWrapper";
import { useRef } from "react";
import ReactQuill from "react-quill";

export default function KnowledgeAddFormQuill() {
  const quillRef = useRef<ReactQuill>(null);

  return (
    <QuillDynamicWrapper
      forwardedRef={quillRef}
      theme="snow"
    />
  );
}
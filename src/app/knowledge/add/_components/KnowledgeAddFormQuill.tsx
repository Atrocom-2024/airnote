'use client';

import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";

import QuillDynamicWrapper from "@/app/_components/QuillDynamicWrapper";

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

export default function KnowledgeAddFormQuill({ value, onChange }: PropsType) {
  const quillRef = useRef<ReactQuill>(null);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ align: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  return (
    <QuillDynamicWrapper
      className="mt-3"
      forwardedRef={quillRef}
      modules={modules}
      formats={formats}
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
}

interface PropsType {
  value: string,
  onChange: (content: string) => void;
}
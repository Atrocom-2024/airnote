'use client';

import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";

import QuillDynamicWrapper from "@/app/_components/QuilldynamicWrapper";

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

export default function KnowledgeAddFormQuill() {
  const [ values, setValues ] = useState('');
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

  const editorChangeHandler = (e: any) => {
    setValues(e);
  }

  return (
    <QuillDynamicWrapper
      className="mt-3 h-[300px]"
      forwardedRef={quillRef}
      modules={modules}
      formats={formats}
      value={values}
      onChange={editorChangeHandler}
      theme="snow"
    />
  );
}
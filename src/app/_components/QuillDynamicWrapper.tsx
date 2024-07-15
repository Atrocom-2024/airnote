'use client';

import dynamic from "next/dynamic";
import ReactQuill, { ReactQuillProps } from "react-quill";
import 'react-quill/dist/quill.snow.css';

import LoadingUI from "./LoadingUI";

const QuillDynamicWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent
        ref={forwardedRef}
        style={{borderRadius: '10px'}}
        {...props}
      />
    );
    return Quill;
  },
  { loading: () => <LoadingUI className="mt-10" />, ssr: false }
);

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

export default QuillDynamicWrapper;


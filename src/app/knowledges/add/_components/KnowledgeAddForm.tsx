'use client';

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { throttle } from "lodash";

import KnowledgeFormQuill from "@/app/_components/KnowledgeFormQuill";
import LoadingUI from "@/app/_components/LoadingUI";

export default function KnowledgeAddForm() {
  const router = useRouter();
  const {
    register,
    setValue,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      content: '',
      thumbnail_file: null,
      thumbnail_url: ''
    }
  });

  const fileVerifyHandler = register('thumbnail_file', {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const limitsize = 1024 ** 2 * 3; // 3MB
        if (e.target.files[0].size > limitsize) {
          setValue('thumbnail_file', null);
          return alert('파일은 최대 3MB까지만 업로드 할 수 있습니다.');
        }
        const fileType = e.target.files[0].type.split('/')[1];
        if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
          setValue('thumbnail_file', null);
          return alert('파일은 .png 또는 .jpg 형식의 파일만 지원합니다.');
        }
      }
    }
  });

  const formSubmitHandler = throttle(async (data: FormInputs) => {
    // 폼 작성요소 검사
    if (!data.title) {
      return alert('제목을 입력해주세요.');
    } else if (!data.content) {
      return alert('본문을 입력해주세요.');
    }

    // 인증서류 S3 업로드 요청
    if (data.thumbnail_file) {
      try {
        const form = new FormData();
        form.append('thumbnail_file', data.thumbnail_file[0]);

        const res = await fetch('/api/knowledges/thumbnail-file', {
          method: 'POST',
          body: form
        });
        const json = await res.json();
        setValue('thumbnail_url', json.thumbnail_url);
      } catch (err) {
        console.error(err);
      }
    }

    // 지식 작성 요청
    try {
      const res = await fetch('/api/knowledges', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          knowledge_title: data.title,
          knowledge_content: data.content,
          thumbnail_url: watch('thumbnail_url')
        })
      });
      const json = await res.json();
      if (res.ok) {
        router.push(`/knowledges/${json.knowledge_id}`);
      } else {
        return alert('지식 작성에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      return alert('지식 작성에 실패했습니다.');
    }
  }, 2000);

  if (isSubmitting) {
    return <LoadingUI />;
  }

  return (
    <form className="mt-10 text-light-black space-y-10 grid grid-cols-1" onSubmit={handleSubmit(formSubmitHandler)}>
      <section>
        <div>제목</div>
        <input
          className="block w-full h-[40px] border border-gray rounded-md outline-none text-sm px-3 mt-3"
          type="text"
          placeholder="제목을 입력해주세요."
          {...register('title')}
        />
      </section>
      <section>
        <div>본문</div>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({field}) => (
            <KnowledgeFormQuill value={field.value} onChange={field.onChange} />
          )}
        />
      </section>
      <section>
        <div>대표사진</div>
        <input
          className="block w-full border border-gray rounded-md outline-none text-sm px-3 py-2 mt-3"
          type="file"
          {...register('thumbnail_file')}
          onChange={fileVerifyHandler.onChange}
        />
      </section>
      <button className="px-4 py-3 mx-auto bg-default rounded-xl text-sm text-white">작성완료</button>
    </form>
  );
}

interface FormInputs {
  title: string;
  content: string;
  thumbnail_file: FileList | null;
  thumbnail_url: string;
}
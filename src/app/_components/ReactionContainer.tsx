import { HiHandThumbDown, HiHandThumbUp } from "react-icons/hi2";

export default function ReactionContainer({ likes, dislikes }: PropsType) {
  return (
    <article className="flex justify-end items-center mr-5 text-gray">
      <div className="flex items-center mr-3">
        <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
      <div className="text-xs ml-1 sm:text-sm">{ likes }</div>
      </div>
      <div className="flex items-center">
        <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
      <div className="text-xs ml-1 sm:text-sm">{ dislikes }</div>
      </div>
    </article>
  );
}

interface PropsType extends React.ComponentProps<'article'> {
  likes: number;
  dislikes: number;
}
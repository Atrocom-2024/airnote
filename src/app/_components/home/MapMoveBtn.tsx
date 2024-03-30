'use client'

export default function MapMoveBtn({ locName }: PropsType) {
  return (
    <button className="bg-purple text-white text-sm px-3 py-1 rounded-full">{ locName }</button>
  );
}

interface PropsType extends React.ComponentProps<'button'> {
  locName: string;
}
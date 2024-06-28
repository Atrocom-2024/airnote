export default function CustomOverlay({ address }: PropsType) {
  return (
    <div className="relative bg-white px-4 py-2 rounded-lg shadow-lg">
      <div className="text-sm font-bold">{address}</div>
      <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
    </div>
  );
};

interface PropsType {
  address: string;
}
export default function Separator() {
  return (
    <div className="flex w-full items-center my-[20px]">
      <div className="flex-1 h-[1px] bg-gray-200"></div>
      <div className="text-gray-300 mx-[20px] text-[12px] font-bold uppercase">
        OR
      </div>
      <div className="flex-1 h-[1px] bg-gray-200"></div>
    </div>
  );
}

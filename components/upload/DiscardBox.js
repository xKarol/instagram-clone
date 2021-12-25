export default function DiscardBox() {
  return (
    <div className="flex flex-col items-center w-[400px] pt-[30px]">
      <h1 className="font-medium text-[17px] mb-[5px]">Discard post?</h1>
      <p className="text-[14px] text-gray-300 mb-[25px]">
        If you leave, your edits won&apos;t be saved.
      </p>
      <button className="p-[10px] w-full font-medium text-[14px] text-red border border-transparent border-t-gray-200">
        Discard
      </button>
      <button className="p-[10px] w-full text-[14px] border border-transparent border-t-gray-200">
        Cancel
      </button>
    </div>
  );
}

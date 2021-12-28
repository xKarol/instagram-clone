export default function Comments({ count }) {
  return (
    <>
      {!!count && (
        <div className="w-full text-[14px] text-gray-300 mb-[5px]">
          <span className="cursor-pointer">View all {count} comments</span>
        </div>
      )}
    </>
  );
}

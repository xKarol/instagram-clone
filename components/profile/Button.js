export default function EditButton({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-[14px] h-[30px] flex justify-center items-center px-[8px] font-medium border border-gray-200 rounded-[5px] ${className}`}
    >
      {children}
    </button>
  );
}

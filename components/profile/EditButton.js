export default function EditButton({ children, className }) {
  return (
    <button
      className={`text-[14px] p-[4px] px-[8px] font-medium bg-transparent border border-gray-200 rounded-[5px] ${className}`}
    >
      {children}
    </button>
  );
}

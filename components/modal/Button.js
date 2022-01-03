export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`p-[10px] w-full text-[14px] border border-transparent border-t-gray-200 hover:bg-gray-100 ${className}`}
    >
      {children}
    </button>
  );
}

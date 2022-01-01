export default function Box({ children, className }) {
  return (
    <div
      className={`bg-white border border-gray-200 flex items-center flex-col px-[35px] py-5 w-full ${className}`}
    >
      {children}
    </div>
  );
}

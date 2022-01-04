export default function ProgressBar({ value, className }) {
  return (
    <div className={`h-[4px] ${className}`}>
      <div
        className={`transition-[width] w-[${value}%] h-full bg-gradient-to-r from-[#28C2F4] to-[#8A2EC7]`}
      ></div>
    </div>
  );
}

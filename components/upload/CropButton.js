export default function CropButton({ Icon, style = "left-[15px]" }) {
  return (
    <div
      className={`absolute z-10 w-[30px] h-[30px] flex justify-center items-center ${style} bottom-[15px] bg-black/75 rounded-full cursor-pointer transition-opacity hover:opacity-50`}
    >
      {Icon}
    </div>
  );
}

import { useRef } from "react";

export default function InputField({
  type,
  placeholder,
  value,
  onChange,
  testId,
}) {
  const passwordShowBtnRef = useRef(null);
  const inputRef = useRef(null);

  const togglePassword = () => {
    const type =
      inputRef.current.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordShowBtnRef.current.innerText =
      type === "password" ? "Show" : "Hide";
    inputRef.current.setAttribute("type", type);
  };

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-sm text-[12px] w-full relative">
      <input
        type={type ?? "text"}
        className="pt-[13px] p-[8px] w-full h-full bg-transparent peer"
        value={value}
        onChange={onChange}
        required
        ref={inputRef}
        data-cy={testId}
      />
      <span className="select-none text-gray-300 absolute top-1/2 -translate-y-1/2 left-[8px] pointer-events-none transition-all peer-valid:top-[8px] peer-valid:text-[10px] truncate">
        {placeholder}
      </span>
      {type === "password" && (
        <span
          className={`absolute top-1/2 right-[10px] -translate-y-1/2 text-[14px] font-[600] cursor-pointer ${
            !value && "hidden"
          }`}
          onClick={togglePassword}
          ref={passwordShowBtnRef}
          data-cy="password-show"
        >
          Show
        </span>
      )}
    </div>
  );
}

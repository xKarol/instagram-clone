import Loading from "../Loading";

export default function Submit({ text, pending, disabled }) {
  return (
    <button
      aria-label="submit"
      disabled={disabled}
      data-cy="validation-submit"
      className="h-[30px] flex items-center justify-center rounded-sm text-[14px] w-full text-white bg-blue mt-[10px] py-[5px] font-medium disabled:opacity-25"
    >
      {!pending ? (
        <>{text}</>
      ) : (
        <Loading
          data-cy="submit-loading"
          className={
            "w-[15px] h-[15px] border-[2px] border-white/25 border-t-white"
          }
        />
      )}
    </button>
  );
}

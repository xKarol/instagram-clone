const Error = ({ error }) => {
  return (
    error && (
      <span
        className="text-red text-[14px] text-center"
        data-testid="validation-error"
      >
        {error}
      </span>
    )
  );
};

export default Error;

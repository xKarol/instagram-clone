export default function Error({ error }) {
  return (
    <>
      {error && (
        <span className="text-red text-[14px] text-center" data-cy="validation-error">{error}</span>
      )}
    </>
  );
}

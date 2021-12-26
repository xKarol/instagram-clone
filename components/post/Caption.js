export default function Caption({ username, caption }) {
  return (
    <div className="w-full text-[14px] max-h-[40px] flex leading-[15px]">
      <span className="font-medium">
        {username}
        &nbsp;
        <span className="font-normal">{caption}</span>
      </span>
    </div>
  );
}

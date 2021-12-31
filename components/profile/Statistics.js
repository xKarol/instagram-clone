export default function Statistics({posts, followers, following}) {
  return (
    <div className="flex space-x-[30px]">
      <span>
        <b className="font-medium">{posts}</b> posts
      </span>
      <span>
        <b className="font-medium">{followers}</b> followers
      </span>
      <span>
        <b className="font-medium">{following}</b> following
      </span>
    </div>
  );
}

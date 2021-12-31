import StatisticData from "./StatisticData";
export default function Statistics({ posts, followers, following, className }) {
  return (
    <div
      className={`flex text-[14px] md:text-[16px] space-x-[30px] py-[5px] border border-transparent border-t-gray-200 ${className}`}
    >
      <StatisticData name="posts" value={posts} />
      <StatisticData name="followers" value={followers} />
      <StatisticData name="following" value={following} />
    </div>
  );
}

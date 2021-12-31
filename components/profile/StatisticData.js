export default function StatisticData({ value, name }) {
  return (
    <span className="flex-1 md:flex-[0] flex justify-center items-center flex-col md:flex-row text-gray-300 md:text-black">
      <b className="font-medium text-black">{value}</b>
      &nbsp;
      {name}
    </span>
  );
}

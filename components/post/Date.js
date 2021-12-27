import Moment from "react-moment";

export default function Date({ timestamp }) {
  return (
    <div className="w-full uppercase text-[10px] text-gray-300 mb-[16px]">
      <Moment fromNow>{timestamp.toDate()}</Moment>
    </div>
  );
}
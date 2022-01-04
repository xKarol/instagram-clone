import Moment from "react-moment";

export default function Date({ timestamp }) {
  return (
    <p className="w-full uppercase text-[10px] text-gray-300 mt-[5px] mb-[16px]">
      <Moment fromNow>{timestamp?.toDate()}</Moment>
    </p>
  );
}

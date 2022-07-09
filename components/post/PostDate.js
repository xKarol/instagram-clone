import Moment from "react-moment";

export default function Date({ children }) {
  return (
    <p className="uppercase text-[10px] text-gray-300 mt-[5px] mb-[16px]">
      <Moment fromNow>{children}</Moment>
    </p>
  );
}

import { useContext } from "react";
import PhotoContext from "../../context/PhotoContext";

export default function Likes() {
  const { likes } = useContext(PhotoContext);

  return (
    <div className="w-full text-[14px] font-medium flex items-center">
      {likes?.length}
      &nbsp;
      {likes?.length === 1 ? "like" : "likes"}
    </div>
  );
}

import { useContext } from "react";
import PhotoContext from "../../context/PhotoContext";

export default function Likes() {
  const { photo, liked } = useContext(PhotoContext);

  return (
    <div className="w-full text-[14px] font-medium flex items-center">
      {photo?.likes?.length}
      &nbsp;
      {photo?.likes?.length === 1 ? "like" : "likes"}
    </div>
  );
}

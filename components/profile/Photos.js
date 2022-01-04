import { useContext } from "react";
import Photo from "./Photo";
import ProfileContext from "../../context/ProfileContext";

export default function Photos() {
  const { photos } = useContext(ProfileContext);
  return (
    <div className="grid grid-cols-[repeat(3,minmax(80px,_1fr))] w-full gap-[3px] md:gap-[30px]">
      {photos.map((photo) => (
        <Photo
          key={photo?.photoId}
          data={photo}
        />
      ))}
    </div>
  );
}

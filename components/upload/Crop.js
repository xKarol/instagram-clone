import Image from "next/image";
import { BiExpandAlt, BiZoomIn } from "react-icons/bi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import CropButton from "./CropButton";

export default function Crop({ src, disableBtns }) {
  //   TODO many images feature
  return (
    <div className="relative h-full w-[400px] max-w-[400px]">
      {src.length && (
        <>
          <Image
            src={src[0]}
            objectFit="cover"
            alt="upload image"
            layout="fill"
          />
          {!disableBtns && (
            <>
              <CropButton
                style={"left-[15px]"}
                Icon={<BiExpandAlt className="text-gray-100" />}
              />
              <CropButton
                style={"left-[55px]"}
                Icon={<BiZoomIn className="text-gray-100" />}
              />
              <CropButton
                style={"right-[15px]"}
                Icon={<MdOutlinePhotoLibrary className="text-gray-100" />}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

import Image from "next/image";
import { BiExpandAlt, BiZoomIn } from "react-icons/bi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import Button from "./Button";

export default function ({ src, disableBtns }) {
  //   TODO many images feature
  return (
    <div className="relative block h-full w-[400px] max-w-[400px]">
      {!!src.length && (
        <>
          <Image
            src={src[0]}
            layout="fill"
            objectFit="cover"
            alt="upload image"
          />
          {!disableBtns && (
            <>
              <Button
                style={"left-[15px]"}
                Icon={<BiExpandAlt className="text-gray-100" />}
              />
              <Button
                style={"left-[55px]"}
                Icon={<BiZoomIn className="text-gray-100" />}
              />
              <Button
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

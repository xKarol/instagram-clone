import Image from "next/image";

export default function Crop({ src }) {
  //   TODO many images feature
  return (
    <div className="relative w-full">
      <Image
        src={src[0]}
        objectFit="contain"
        alt="upload image"
        layout="fill"
      />
    </div>
  );
}

import Image from "next/image";

export default function Photo({ image, username, caption }) {
  return (
    <div className="w-full relative">
      <Image
        src={image}
        alt={`${username}'s photo ${caption && caption}`}
        layout="responsive"
        width={"100%"}
        height={"100%"}
        objectFit="cover"
        priority
      />
    </div>
  );
}

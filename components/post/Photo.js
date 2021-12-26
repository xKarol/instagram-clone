import Image from "next/image";

export default function Photo({ image, username, caption }) {
  return (
    <div className="w-full h-[600px] relative">
      <Image
        src={image}
        alt={`${username}'s photo ${caption && caption}`}
        layout="fill"
        priority
      />
    </div>
  );
}

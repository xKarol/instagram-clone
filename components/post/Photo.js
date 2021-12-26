import Image from "next/image";

export default function Photo({ image, username, caption }) {
  console.log(image);
  return (
    <div className="w-full h-[600px] border border-[#ff0000]">
      {/* <Image
        src={
          "https://firebasestorage.googleapis.com/v0/b/instagram-clone-66f75.appspot.com/o/images%2Fkarol%2F1640446360497_6765d45d7f8e9af60b93628c4a272c79.jpg?alt=media&token=9cb4881e-3586-4872-a2ed-e115ade2b8f0"
        }
        alt={`${username}'s photo ${caption && caption}`}
        width={400}
        height={200}
      /> */}
    </div>
  );
}

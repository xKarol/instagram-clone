import Photo from "./Photo";
export default function Photos({ photos }) {
  return (
    <div className="grid grid-cols-[repeat(3,minmax(80px,_1fr))] w-full gap-[3px] md:gap-[30px]">
      {photos.map((photo) => (
        <Photo
          key={photo?.photoId}
          src={photo?.image}
          comments={photo?.comments?.length}
          likes={photo?.likes?.length}
        />
      ))}
    </div>
  );
}

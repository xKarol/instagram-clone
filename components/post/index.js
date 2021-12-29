import Post from "./Post";
import usePhotos from "../../hooks/usePhotos";

export default function Posts() {
  const { photos } = usePhotos();

  return (
    <>
      {photos.map((photo, index) => (
        <Post key={index} data={photo} />
      ))}
    </>
  );
}

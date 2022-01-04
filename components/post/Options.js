import { useRouter } from "next/router";
import { useState, useContext } from "react";
import PhotoContext from "../../context/PhotoContext";
import UserContext from "../../context/UserContext";
import Button from "../Modal/Button";
import Loading from "../Loading";
import { deletePost } from "../../services/firebase";
import { deletePhotoFromStorage } from "../../services/storage";

export default function Options() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { photo, setShowModal } = useContext(PhotoContext);
  const { user, photos, setPhotos, loggedIn } = useContext(UserContext);
  const isCreator = photo?.user?.uid === user.uid;

  const handleDelete = async () => {
    if (!photo.fileName || !isCreator || pending || !loggedIn) return;
    setPending(true);
    await deletePost(photo.photoId);
    await deletePhotoFromStorage(user.username, photo.fileName);
    setPhotos(photos.filter((el) => el?.photoId !== photo?.photoId));
    setPending(false);
    setShowModal(false);
    if (router.asPath !== "/") {
      router.push("/");
    }
  };

  return (
    <section className="flex flex-col items-center w-[400px]">
      {!!isCreator && (
        <Button onClick={handleDelete} className={"text-red font-medium"}>
          {!pending ? "Delete" : <Loading />}
        </Button>
      )}
      <Button>Share to...</Button>
      <Button>Copy link</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </section>
  );
}

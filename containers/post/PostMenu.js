import { useRouter } from "next/router";
import { useState } from "react";
import { usePostContext } from "../../context/PostContext";
import { useUserContext } from "../../context/UserContext";
import Button from "../../components/modal/Button";
import Loading from "../../components/loading";
import { deletePost } from "../../services";
import { deletePhotoFromStorage } from "../../services";
import { db } from "../../config/firebase.config";

const PostMenuContainer = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const {
    photo: { photoId, fileName, user: photoUser },
    setShowModal,
  } = usePostContext();
  const {
    user: { username, uid: userId },
    photos,
    setPhotos,
    loggedIn,
  } = useUserContext();
  const isAuthorized = photoUser?.uid === userId;

  const handleDelete = async () => {
    if (!fileName || !isAuthorized || pending || !loggedIn) return;
    setPending(true);
    await deletePost(db, photoId);
    await deletePhotoFromStorage(username, fileName);
    setPhotos(photos.filter((el) => el.photoId !== photoId));
    setPending(false);
    setShowModal(false);
    if (router.asPath !== "/") {
      router.push("/");
    }
  };

  return (
    <section className="flex flex-col items-center w-screen sm:w-[400px]">
      {!!isAuthorized && (
        <Button onClick={handleDelete} className={"text-red font-medium"}>
          {!pending ? "Delete" : <Loading />}
        </Button>
      )}
      <Button>Share to...</Button>
      <Button>Copy link</Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </section>
  );
};

export default PostMenuContainer;

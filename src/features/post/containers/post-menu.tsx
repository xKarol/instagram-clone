import { useRouter } from "next/router";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { Loading } from "../../../components/loading";
import Button from "../../../components/modal/button";
import { db } from "../../../config/firebase.config";
import { ROUTE_HOME, ROUTE_POST } from "../../../constants/routes";
import { usePostsContext } from "../../../context/posts-context";
import { useUserContext } from "../../../context/user-context";
import { deletePhotoFromStorage } from "../../../services";
import { usePostContext } from "../context";
import { deletePost } from "../services";

const PostMenuContainer = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  const {
    photo: { photoId, image, user: photoUser },
    setShowModal,
  } = usePostContext();
  const {
    user: { uid: userId, username },
    loggedIn,
  } = useUserContext();
  const { photos, setPhotos } = usePostsContext();
  const isAuthorized = photoUser?.uid === userId;

  const handleDelete = async () => {
    if (!isAuthorized || pending || !loggedIn) return;
    setPending(true);
    await deletePost(db, photoId);
    await deletePhotoFromStorage(username, image.name);
    setPhotos(photos.filter((el) => el.photoId !== photoId));
    setPending(false);
    setShowModal(false);
    if (router.asPath !== ROUTE_HOME) {
      await router.push(ROUTE_HOME);
    }
  };

  const handleCopy = () => {
    copyToClipboard(`${process.env.NEXT_PUBLIC_HOST}${ROUTE_POST}/${photoId}`);
    setIsCopied(true);
  };

  return (
    <section className="flex flex-col items-center w-screen sm:w-[400px]">
      {!!isAuthorized && (
        <Button onClick={handleDelete} className="text-red font-medium">
          {!pending ? "Delete" : <Loading />}
        </Button>
      )}
      <Button>Share to...</Button>
      <Button onClick={handleCopy}>
        {isCopied && !state.error ? "Copied" : "Copy link"}
      </Button>
      <Button onClick={() => setShowModal(false)}>Cancel</Button>
    </section>
  );
};

export default PostMenuContainer;

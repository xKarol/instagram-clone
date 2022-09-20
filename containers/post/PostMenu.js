import { useRouter } from "next/router";
import { useState } from "react";
import { usePostContext } from "../../context/PostContext";
import { useUserContext } from "../../context/UserContext";
import Button from "../../components/modal/Button";
import Loading from "../../components/loading";
import { deletePost } from "../../services";
import { deletePhotoFromStorage } from "../../services";
import { db } from "../../config/firebase.config";
import { ROUTE_HOME, ROUTE_POST } from "../../constants/routes";
import { useCopyToClipboard } from "react-use";

const PostMenuContainer = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
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
    if (router.asPath !== ROUTE_HOME) {
      router.push(ROUTE_HOME);
    }
  };

  const handleCopy = () => {
    copyToClipboard(`${process.env.NEXT_PUBLIC_HOST}${ROUTE_POST}/${photoId}`);
    setIsCopied(true);
  };

  return (
    <section className="flex flex-col items-center w-screen sm:w-[400px]">
      {!!isAuthorized && (
        <Button onClick={handleDelete} className={"text-red font-medium"}>
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

import { useState, useEffect } from "react";
import clsx from "clsx";
import { useUserContext } from "../../../context/UserContext";
import { usePostUploadContext } from "../../../context/PostUploadContext";
import { db } from "../../../config/firebase.config";
import { trimSpace } from "../../../utils";
import { createPost, getPhotoById, uploadPhoto } from "../../../services";
import { PostUploadError } from "../../../components/post-upload";
import {
  PostUploadPageBox,
  PostUploadSpinner,
} from "../../../components/post-upload";

const PostUploadSharePageContainer = () => {
  const [error, setError] = useState(false);
  const {
    user: { username },
    setPhotos,
  } = useUserContext();
  const {
    state: { uploaded, caption, file },
    dispatch,
  } = usePostUploadContext();

  useEffect(() => {
    const uploadFile = async () => {
      try {
        const { downloadURL } = await uploadPhoto(username, file);
        const photoDoc = await createPost({
          db,
          username,
          imageURL: downloadURL,
          caption: trimSpace(caption),
        });
        const photoData = await getPhotoById(db, photoDoc.id);
        dispatch({ type: "SET_UPLOADED", payload: true });
        setPhotos((prevState) => [photoData, ...prevState]);
      } catch {
        setError(true);
      }
    };
    uploadFile();
  }, [setPhotos, file, dispatch, caption, username]);

  return (
    <PostUploadPageBox className="space-y-[15px]">
      {error ? (
        <PostUploadError
          captionText="Your post could not be shared. Please try again."
          elementsProps={{
            caption: { className: "text-[20px] text-gray-300" },
          }}
        />
      ) : (
        <>
          <PostUploadSpinner spin={!uploaded} />
          <p
            className={clsx(
              "text-gray-300 text-[18px] text-center",
              !uploaded && "invisible"
            )}
          >
            Your post has been shared.
          </p>
        </>
      )}
    </PostUploadPageBox>
  );
};

export default PostUploadSharePageContainer;

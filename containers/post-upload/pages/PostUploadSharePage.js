import { useState, useEffect } from "react";
import clsx from "clsx";
import { useUserContext } from "../../../context/UserContext";
import { usePostUploadContext } from "../../../context/PostUploadContext";
import { db } from "../../../config/firebase.config";
import { trimSpace } from "../../../utils";
import { uploadNewPost, getPhotoById } from "../../../services";
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
    state: { uploaded, caption, files },
    dispatch,
  } = usePostUploadContext();

  useEffect(() => {
    const uploadFile = async () => {
      try {
        const photoDoc = await uploadNewPost({
          db,
          username,
          file: files,
          caption: trimSpace(caption),
        });
        const photoData = await getPhotoById(db, photoDoc.id);
        dispatch({ uploaded: true });
        setPhotos((prevState) => [photoData, ...prevState]);
      } catch {
        setError(true);
      }
    };
    uploadFile();
  }, [setPhotos, files, dispatch, caption, username]);

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

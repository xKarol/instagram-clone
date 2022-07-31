import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import UserContext from "../../../context/UserContext";
import { db } from "../../../config/firebase.config";
import { IoMdCheckmark } from "react-icons/io";
import { usePostUploadContext } from "../../../context/PostUploadContext";
import { trimSpace } from "../../../utils";
import { getPhotoById } from "../../../services";
import { PostUploadError } from "./";
import { uploadNewPost } from "../../../services";
import {
  PostUploadPageBox,
  PostUploadSpinner,
} from "../../../components/upload";

const PostUploadSharePageContainer = () => {
  const [error, setError] = useState(false);
  const {
    user: { username },
    setPhotos,
  } = useContext(UserContext);
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

import { useState, useEffect, useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import UserContext from "../../context/UserContext";
import UploadContext from "../../context/UploadContext";
import Error from "./Error";
import { trimSpace } from "../../services/utils";
import { uploadPhoto } from "../../services/storage";

function Share() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);
  const {
    state: { uploaded, caption, files, previewFiles },
    dispatch,
  } = useContext(UploadContext);

  useEffect(() => {
    const uploadFile = async () => {
      if (!files.length) return;
      try {
        const { downloadURL, fileName } = await uploadPhoto(
          user.username,
          previewFiles[0],
          files[0].name
        );
        await addDoc(collection(db, "photos"), {
          image: downloadURL,
          fileName: fileName,
          username: user.username,
          caption: trimSpace(caption),
          timestamp: serverTimestamp(),
        });
        setLoading(false);
        dispatch({ uploaded: true });
      } catch {
        setError(true);
      }
    };
    uploadFile();
  }, []);

  return (
    <div className="w-[400px] flex flex-col justify-center items-center space-y-[15px]">
      {error ? (
        <Error
          caption={
            <p className="text-[20px] text-gray-300 text-center">
              Your post could not be shared. Please try again.
            </p>
          }
        />
      ) : (
        <>
          <div
            className={`${
              loading && "animate-spin"
            } flex items-center justify-center w-[100px] h-[100px] bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-full relative`}
          >
            <div className="bg-white w-[92px] h-[92px] rounded-full " />
            {uploaded && (
              <IoMdCheckmark className="absolute text-[35px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#fcb045]" />
            )}
          </div>
          {!loading && (
            <p className="text-gray-300 text-[18px]">
              Your post has been shared.
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default Share;

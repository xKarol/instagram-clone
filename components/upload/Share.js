import { useState, useEffect, useContext } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase.config";
import UserContext from "../../context/UserContext";

function Share({ files, caption }) {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    const uploadFile = async () => {
      if (!files.length || loading) return;
      //TODO multiple files upload
      try {
        setLoading(true);
        const fileName = Date.now() + "_" + files[0].name;
        const storage = getStorage();
        const imageRef = ref(storage, `images/${user.username}/${fileName}`);
        await uploadBytes(imageRef, files[0]);
        const downloadURL = await getDownloadURL(imageRef);
        await addDoc(collection(db, "photos"), {
          image: downloadURL,
          username: user.username,
          caption: caption,
          timestamp: serverTimestamp(),
        });
        setLoading(false);
        setUploaded(true);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    uploadFile();
  }, [files, user.username, caption]);
  return (
    <div className="w-[400px] flex flex-col justify-center items-center space-y-[15px]">
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
        <p className="text-gray-300 text-[18px]">Your post has been shared.</p>
      )}
    </div>
  );
}

export default Share;

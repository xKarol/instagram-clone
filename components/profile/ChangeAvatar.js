import { useContext, useRef, useState, useEffect } from "react";
import Loading from "../Loading";
import { db } from "../../config/firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import UserContext from "../../context/UserContext";
import ProfileContext from "../../context/ProfileContext";
import {
  uploadAvatar,
  deleteAvatarFromStorage,
  getUserByUsername,
} from "../../services";

export default function ChangeAvatar({ children }) {
  const { setUser, user } = useContext(UserContext);
  const { user: profileUser, setUser: setProfileUser } =
    useContext(ProfileContext);
  const fileRef = useRef(null);
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState(null);
  const [readerResult, setReaderResult] = useState("");

  const handleClick = () => {
    if (profileUser?.uid !== user?.uid) return;
    fileRef.current.click();
  };

  useEffect(() => {
    const uploadFile = async () => {
      if (!readerResult || !file || pending) return;
      setPending(true);
      const { downloadURL, fileName } = await uploadAvatar(
        readerResult,
        file.name
      );
      await updateDoc(doc(db, "users", user?.uid), {
        avatar: downloadURL,
        avatarFileName: fileName,
      });
      if (user?.avatarFileName) {
        await deleteAvatarFromStorage(user?.avatarFileName);
      }
      const userData = await getUserByUsername(db, user?.username);
      setFile(null);
      setPending(false);
      setReaderResult("");
      setUser(userData);
      setProfileUser(userData);
    };
    uploadFile();
  }, [
    readerResult,
    file,
    setProfileUser,
    user?.uid,
    user?.username,
    setUser,
    user?.avatarFileName,
    pending,
  ]);

  useEffect(() => {
    const reader = new FileReader();

    const handleLoad = () => {
      if (!reader.result) return;
      setReaderResult(reader.result);
    };

    if (file) {
      setLoading(true);
    }

    reader.addEventListener("load", handleLoad);
    return () => {
      reader.removeEventListener("load", handleLoad);
    };
  }, [file]);

  const handleSelect = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <div
        className="w-full h-full cursor-pointer relative"
        onClick={handleClick}
      >
        {pending && (
          <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        )}
        {children}
      </div>
      <input
        onChange={(e) => handleSelect(e)}
        type="file"
        ref={fileRef}
        hidden
      />
    </>
  );
}

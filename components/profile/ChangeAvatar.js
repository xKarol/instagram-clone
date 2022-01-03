import { useContext, useRef, useState, useEffect } from "react";
import { uploadAvatar } from "../../services/storage";
import Loading from "../Loading";
import { db } from "../../config/firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import UserContext from "../../context/UserContext";
import ProfileContext from "../../context/ProfileContext";
import { getUserByUsername } from "../../services/firebase";
import { deleteAvatarFromStorage } from "../../services/storage";

export default function ChangeAvatar({ children }) {
  const { setUser, user } = useContext(UserContext);
  const { user: profileUser, setUser: setProfileUser } =
    useContext(ProfileContext);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    if (profileUser?.uid !== user?.uid) return;
    fileRef.current.click();
  };

  useEffect(() => {
    const reader = new FileReader();
    const handleLoad = () => {
      setLoading(true);
    };

    const handleEnd = async () => {
      const { downloadURL, fileName } = await uploadAvatar(
        reader.result,
        file.name
      );
      await updateDoc(doc(db, "users", user?.uid), {
        avatar: downloadURL,
        avatarFileName: fileName,
      });
      user?.avatarFileName &&
        (await deleteAvatarFromStorage(user.avatarFileName));
      const userData = await getUserByUsername(user?.username);

      setUser(userData);
      setProfileUser(userData);
      setLoading(false);
    };

    const upload = () => {
      if (!file) return;
      reader.readAsDataURL(file);
    };
    upload();

    reader.addEventListener("loadstart", handleLoad);
    reader.addEventListener("loadend", handleEnd);
    return () => {
      reader.removeEventListener("loadstart", handleLoad);
      reader.removeEventListener("loadend", handleEnd);
    };
  }, [file]);

  const handleSelect = async (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <div
        className="w-full h-full cursor-pointer relative"
        onClick={handleClick}
      >
        {loading && (
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

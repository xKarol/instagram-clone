import clsx from "clsx";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loading } from "../../../components/loading";
import { db } from "../../../config/firebase.config";
import { useUserContext } from "../../../context/user-context";
import { getUserByUsername, updateUserAvatar } from "../../../services";
import { useProfileContext } from "../context";

type Props = React.ComponentPropsWithoutRef<"div">;

const ProfileAvatarChangeContainer = ({ children, className }: Props) => {
  const {
    setUser,
    user: { uid: userId, username },
  } = useUserContext();
  const {
    profile: { user: profileUser },
    setProfile,
  } = useProfileContext();
  const [pending, setPending] = useState(false);
  const [, setError] = useState(false);
  const isAuthorized = userId === profileUser?.uid;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (pending || !isAuthorized) return;
      const file = acceptedFiles[0];
      try {
        setPending(true);
        await updateUserAvatar({
          db,
          fileName: file.name,
          oldAvatarName: "", //TODO remove this field
          userId: userId,
          file,
        });
        const userData = await getUserByUsername(db, username);
        setUser(userData);
        setProfile(({ posts }) => ({ posts: posts, user: userData }));
      } catch {
        setError(true);
      } finally {
        setPending(false);
      }
    },
    [pending, userId, setProfile, setUser, username, isAuthorized]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      className={clsx("cursor-pointer relative rounded-full", className)}
      {...getRootProps()}
    >
      <input {...getInputProps({ multiple: false })} />
      {pending && (
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
      {children}
    </div>
  );
};

export default ProfileAvatarChangeContainer;

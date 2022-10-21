import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback } from "react";
import isEmail from "validator/lib/isEmail";
import { auth, db } from "../../../config/firebase.config";
import { signInSchema } from "../schemas";
import { getUserByUsername } from "../../../services";
import { useAuthForm } from ".";

type FormValues = {
  login: string;
  password: string;
};

const useSignIn = () => {
  const callback = useCallback(async (data: FormValues) => {
    const { login, password } = data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (isEmail(login)) {
      return await signInWithEmailAndPassword(auth, login, password); //email login
    }
    const { email } = (await getUserByUsername(db, login, false)) ?? {};
    if (!email) throw new Error("Invalid username or email.");
    await signInWithEmailAndPassword(auth, email, password); //username login
  }, []);

  const { isValid, error, isLoading, register, handleSubmit, onSubmit } =
    useAuthForm<FormValues>({
      schema: signInSchema,
      callback,
    });
  return {
    register,
    handleSubmit,
    onSubmit,
    error,
    isLoading,
    isValid,
  };
};

export default useSignIn;

import { useCallback } from "react";
import useAuthForm from "./use-auth-form";
import { db } from "../../../config/firebase.config";
import { getUserByUsername, signUpUser } from "../../../services";
import { signUpSchema } from "../schemas";

type FormValues = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

const useSignUp = () => {
  const callback = useCallback(async (data: FormValues) => {
    const { email, fullName, username, password } = data;
    const usernameInUse = await getUserByUsername(db, username, false);
    if (usernameInUse) {
      throw new Error("Username already in use.");
    }
    await signUpUser({ db, username, fullName, email, password });
  }, []);

  const { isValid, error, isLoading, register, handleSubmit, onSubmit } =
    useAuthForm<FormValues>({
      schema: signUpSchema,
      callback,
    });

  return {
    isLoading,
    error,
    isValid,
    register,
    handleSubmit,
    onSubmit,
  };
};

export default useSignUp;

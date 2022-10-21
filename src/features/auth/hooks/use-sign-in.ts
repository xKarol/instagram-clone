import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
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
  const [isDisabled, setIsDisabled] = useState(true);

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

  const { error, isLoading, register, handleSubmit, onSubmit, watch } =
    useAuthForm<FormValues>({
      resolver: yupResolver(signInSchema),
      disabled: isDisabled,
      callback,
    });
  const watchAll = watch();

  useEffect(() => {
    const isValidForm = () => {
      void signInSchema
        .isValid(watchAll)
        .then((valid) => setIsDisabled(!valid));
    };
    isValidForm();
  }, [watchAll]);

  return {
    register,
    handleSubmit,
    onSubmit,
    error,
    isLoading,
    isDisabled,
  };
};

export default useSignIn;

import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
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
  const [isDisabled, setIsDisabled] = useState(true);

  const callback = useCallback(async (data: FormValues) => {
    const { email, fullName, username, password } = data;
    const usernameInUse = await getUserByUsername(db, username, false);
    if (usernameInUse) {
      throw new Error("Username already in use.");
    }
    await signUpUser({ db, username, fullName, email, password });
  }, []);

  const { error, isLoading, register, handleSubmit, onSubmit, watch } =
    useAuthForm<FormValues>({
      resolver: yupResolver(signUpSchema),
      disabled: isDisabled,
      callback,
    });

  const watchAll = watch();

  useEffect(() => {
    const isValidForm = () => {
      void signUpSchema
        .isValid(watchAll)
        .then((valid) => setIsDisabled(!valid));
    };
    isValidForm();
  }, [watchAll]);

  return {
    isLoading,
    error,
    isDisabled,
    register,
    handleSubmit,
    onSubmit,
  };
};

export default useSignUp;

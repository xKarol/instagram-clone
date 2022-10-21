import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { db } from "../../../config/firebase.config";
import { getUserByUsername, signUpUser } from "../../../services";
import { getAuthErrorMessage } from "../../../utils";

import { signUpSchema } from "../schemas";

type FormValues = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { register, handleSubmit, watch } = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (isDisabled) return;
      const { email, fullName, username, password } = data;
      setLoading(true);
      const usernameInUse = await getUserByUsername(db, username, false);
      if (usernameInUse) {
        return setError("Username already in use.");
      }
      await signUpUser({ db, username, fullName, email, password });
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? getAuthErrorMessage(error.code)
          : (error as string);
      setError(getAuthErrorMessage(message));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    isDisabled,
    register,
    handleSubmit,
    onSubmit,
  };
};

export default useSignUp;

import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import { auth, db } from "../../../config/firebase.config";
import { signInSchema } from "../schemas";
import { getUserByUsername } from "../../../services";
import { getAuthErrorMessage } from "../../../utils";

type FormValues = {
  login: string;
  password: string;
};

const useSignIn = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { register, handleSubmit, watch } = useForm<FormValues>({
    resolver: yupResolver(signInSchema),
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (isDisabled) return;
      const { login, password } = data;
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      if (isEmail(login)) {
        return await signInWithEmailAndPassword(auth, login, password); //email login
      }
      const { email } = (await getUserByUsername(db, login, false)) ?? {};
      if (!email) throw "Invalid username or email.";
      await signInWithEmailAndPassword(auth, email, password); //username login
    } catch (error) {
      const message =
        error instanceof FirebaseError
          ? getAuthErrorMessage(error.code)
          : (error as string);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    error,
    loading,
    isDisabled,
  };
};

export default useSignIn;

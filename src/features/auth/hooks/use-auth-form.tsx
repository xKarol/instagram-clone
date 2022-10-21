import { FirebaseError } from "firebase/app";
import { useState } from "react";
import {
  useForm,
  type UseFormProps,
  type SubmitHandler,
} from "react-hook-form";
import { getAuthErrorMessage } from "../../../utils";

type Props<T> = UseFormProps<T> & {
  callback: (data: T) => Promise<unknown>;
  disabled: boolean;
};

const useAuthForm = <T,>({
  callback,
  disabled = false,
  ...props
}: Props<T>) => {
  const formData = useForm<T>(props);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<T> = async (data) => {
    try {
      if (disabled === true) return;
      setIsLoading(true);
      await callback(data);
    } catch (error) {
      const defaultError = "A problem occured.";
      const customError = error instanceof Error && error.message;
      const firebaseError =
        error instanceof FirebaseError && getAuthErrorMessage(error.code);
      setError(firebaseError || customError || defaultError);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    ...formData,
    isLoading,
    error,
    onSubmit,
  };
};

export default useAuthForm;

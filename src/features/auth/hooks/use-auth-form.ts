import { yupResolver } from "@hookform/resolvers/yup";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import {
  useForm,
  type SubmitHandler,
  type UseFormProps,
} from "react-hook-form";
import type { AnyObjectSchema } from "yup";
import { getAuthErrorMessage } from "../utils";
import { useIsValidForm } from ".";

type Props<T> = UseFormProps<T> & {
  callback: (data: T) => Promise<unknown>;
  schema: AnyObjectSchema;
};

const useAuthForm = <T>({ callback, schema, ...props }: Props<T>) => {
  const { watch, ...formData } = useForm<T>({
    resolver: yupResolver(schema),
    ...props,
  });
  const watchAll = watch();
  const { isValid } = useIsValidForm({ watch: watchAll, schema });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<T> = async (data) => {
    try {
      if (!isValid === true) return;
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
    isValid,
  };
};

export default useAuthForm;

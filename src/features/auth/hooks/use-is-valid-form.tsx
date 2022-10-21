import { useEffect, useState } from "react";
import type { AnyObjectSchema } from "yup";

type Props = {
  watch: unknown;
  schema: AnyObjectSchema;
};

const useIsValidForm = ({ watch, schema }: Props) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const isValidForm = () => {
      void schema.isValid(watch).then((valid) => setIsValid(valid));
    };
    isValidForm();
  }, [schema, watch]);
  return { isValid };
};

export default useIsValidForm;

import { useState } from "react";
import { useEffectOnce } from "react-use";

const useFirebaseFetch = <T>(callback: () => Promise<T>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T>(null);

  useEffectOnce(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const getData = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await callback();
        setData(response);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
  });

  return {
    data,
    loading,
    error,
  };
};

export default useFirebaseFetch;

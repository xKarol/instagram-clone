import { useState } from "react";
import { useEffectOnce } from "react-use";

const useFirebaseFetch = (callback) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

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
    getData();
  }, [callback]);

  return {
    data,
    loading,
    error,
  };
};

export default useFirebaseFetch;

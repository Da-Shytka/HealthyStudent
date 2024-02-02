import { useEffect, useState } from "react";

const controller = new AbortController();
const signal = controller.signal;

const useFetchData = ({ endpoint, options }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url, options, signal);

        const jsonData = await response.json();

        if (!response.ok) {
          setIsError(true);
          setError(jsonData.error);
          return;
        }

        setData(jsonData);
        setIsError(false);
        setError(null);
      } catch (error) {
        setIsError(true);
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return {
    isLoading,
    isError,
    error,
    data,
  };
};

export default useFetchData;

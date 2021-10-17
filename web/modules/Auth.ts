import useSWR from "swr";
import { fetcher } from "./Utils";

export const fetchMe = () => {
  const { data, error } = useSWR(`/.auth/me`, fetcher);

  return {
    user: data,
    loading: !error && !data,
    error,
  };
};

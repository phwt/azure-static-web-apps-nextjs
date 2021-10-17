import useSWR from "swr";
import { fetcher, arrayIntersection } from "./Utils";

export const fetchMe = () => {
  const { data, error } = useSWR(`/.auth/me`, fetcher);

  return {
    user: data,
    loading: !error && !data,
    error,
  };
};

export const checkAllowedRoles = (
  clientPrincipal: {
    userId: string;
    userRoles: string[];
    identityProvider: string;
    userDetails: string;
  },
  allowedRoles: string[]
): boolean => {
  const rolesAllowed =
    clientPrincipal &&
    arrayIntersection(allowedRoles, clientPrincipal.userRoles).length;
  return !!rolesAllowed;
};

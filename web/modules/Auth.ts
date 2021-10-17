import useSWR from "swr";
import {
  fetcher,
  arrayIntersection,
  arraysIntersection,
  getCurrentPath,
} from "./Utils";
import swaconfig from "../staticwebapp.config.json";
import { match } from "node-match-path";

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

export const getPageAllowedRoles = () => {
  const currentPath = getCurrentPath();

  const relatedRoutes = swaconfig.routes.filter(
    (route) => match(route.route, currentPath).matches
  );

  if (relatedRoutes.length) {
    return {
      roles: arraysIntersection(
        relatedRoutes.map((route) => route.allowedRoles)
      ),
    };
  }
  return { any: true }; // Doesn't match any routes - allow anonymous access or any roles
};

export const getStaticPropsAllowedRoles = () => ({
  allowedRoles: getPageAllowedRoles(),
});

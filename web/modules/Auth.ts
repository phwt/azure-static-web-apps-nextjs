import useSWR from "swr";
import {
  fetcher,
  arrayIntersection,
  arraysIntersection,
  getCurrentPath,
} from "./Utils";
import swaconfig from "../staticwebapp.config.json";
import { match } from "node-match-path";

/**
 * Get current user's clientPrincipal
 * @returns current user's clientPrincipal
 */
export const fetchMe = () => {
  const { data, error } = useSWR(`/.auth/me`, fetcher);

  return {
    user: data,
    loading: !error && !data,
    error,
  };
};

/**
 * Check if user has required roles specified in allowedRoles
 * @param clientPrincipal user data returned from /.auth/me
 * @param allowedRoles
 * @returns does roles of user defined in clientPrincipal intersect with allowedRoles
 */
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

/**
 * Read and match routes in staticwebapp.config to get allowedRoles for current page
 * @returns roles allowed to access this page or is anonymous access allowed
 */
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

/**
 * Use in getStaticProps to ensure that allowedRoles will be returned in props
 */
export const getStaticPropsAllowedRoles = () => ({
  allowedRoles: getPageAllowedRoles(),
});

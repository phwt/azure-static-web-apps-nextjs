import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { fetchMe, checkAllowedRoles } from "../modules/Auth";

/**
 * Check for authorization before allowing access - use as HOC to wrap page component
 * In order to use getStaticProps must be present in the page and returning allowedRoles as props
 */
const withAuthorization = (Component) => {
  const RolesRestriction = (props) => {
    const { allowedRoles } = props;
    const { user, loading, error } = fetchMe();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !error) {
        if (!allowedRoles.any) {
          const rolesAllowed = checkAllowedRoles(
            user.clientPrincipal,
            allowedRoles.roles
          );

          if (!rolesAllowed) router.reload(); // Reload so it will show a default 401 page // TODO: Send to custom 401 page
        }
      }
    }, [user, loading, error]);

    if (error) return <div>Error fetching a user!</div>;
    if (loading) return <div>Loading...</div>;

    return <Component {...props} user={user} />;
  };

  return RolesRestriction;
};

export default withAuthorization;

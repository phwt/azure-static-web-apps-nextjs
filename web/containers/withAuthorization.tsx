import { useRouter } from "next/dist/client/router";
import { useEffect, useMemo } from "react";
import { fetchMe, checkAllowedRoles } from "../modules/Auth";

const withAuthorization = (Component) => {
  const RolesRestriction = (props) => {
    const { allowedRoles } = props;
    const { user, loading, error } = fetchMe();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !error) {
        const rolesAllowed = checkAllowedRoles(
          user.clientPrincipal,
          allowedRoles
        );
        if (!rolesAllowed) router.reload(); // Reload so it will show a default 401 page // TODO: Send to custom 401 page
      }
    }, [user, loading, error]);

    const propsWithUser = useMemo(
      () => ({
        ...props,
        user,
      }),
      [props, user]
    );

    if (error) return <div>Error fetching a user!</div>;
    if (loading) return <div>Loading...</div>;

    return <Component {...propsWithUser} />;
  };

  return RolesRestriction;
};

export default withAuthorization;

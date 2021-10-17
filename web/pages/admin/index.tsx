import { useMemo } from "react";
import RolesRestriction from "../../components/RolesRestriction";
import { fetchMe, getStaticPropsAllowedRoles } from "../../modules/Auth";

export const getStaticProps = () => {
  return {
    props: {
      ...getStaticPropsAllowedRoles(),
    },
  };
};

const AdminIndex = ({ allowedRoles }) => {
  const { user, loading, error } = fetchMe();

  const userSection = useMemo(() => {
    if (error) return <div>Error fetching a user!</div>;
    if (loading) return <div>Loading...</div>;

    return (
      <>
        <h5>Current user:</h5>
        <pre>{JSON.stringify(user)}</pre>
      </>
    );
  }, [user, loading, error]);

  return (
    <RolesRestriction allowedRoles={allowedRoles}>
      <h1>Manage Todo List</h1>
      {userSection}
    </RolesRestriction>
  );
};

export default AdminIndex;

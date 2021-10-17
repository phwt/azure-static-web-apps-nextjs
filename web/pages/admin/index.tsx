import { useMemo } from "react";
import withAuthorization from "../../containers/withAuthorization";
import { fetchMe, getStaticPropsAllowedRoles } from "../../modules/Auth";

export const getStaticProps = () => {
  return {
    props: {
      ...getStaticPropsAllowedRoles(),
    },
  };
};

const AdminIndex = () => {
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
    <>
      <h1>Manage Todo List</h1>
      {userSection}
    </>
  );
};

export default withAuthorization(AdminIndex);

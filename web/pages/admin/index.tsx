import withAuthorization from "../../containers/withAuthorization";
import { getStaticPropsAllowedRoles } from "../../modules/Auth";

export const getStaticProps = () => {
  return {
    props: {
      ...getStaticPropsAllowedRoles(),
    },
  };
};

const AdminIndex = ({ user }) => {
  return (
    <>
      <h1>Manage Todo List</h1>
      <h5>Current user:</h5>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default withAuthorization(AdminIndex);

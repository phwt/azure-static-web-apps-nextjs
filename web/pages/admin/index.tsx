import withAuthorization from "../../containers/withAuthorization";
import { getStaticPropsAllowedRoles } from "../../modules/Auth";
import Head from 'next/head';

export const getStaticProps = () => {
  return {
    props: {
      ...getStaticPropsAllowedRoles(__filename),
    },
  };
};

const AdminIndex = ({ user, allowedRoles }) => {
  return (
    <>
    <Head>
        <title>Next.js on Azure | Admin</title>
      </Head>
      <h1>Manage Todo List</h1>
      <h5>Current user:</h5>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default withAuthorization(AdminIndex);

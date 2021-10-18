import Link from "next/link";
import useSWR from "swr";
import { useMemo } from "react";
import { fetcher } from "../modules/Utils";
import withAuthorization from "../containers/withAuthorization";
import { getStaticPropsAllowedRoles } from "../modules/Auth";

export const getStaticProps = () => {
  return {
    props: {
      ...getStaticPropsAllowedRoles(__filename),
    },
  };
};

const Home = () => {
  const { data, error } = useSWR("/api/TodoList", fetcher);

  const todoSection = useMemo(() => {
    if (error) return <div>Error fetching todo!</div>;
    if (!data) return <div>Loading...</div>;

    return (
      <ul className="no-bullets">
        {data.map((todo) => (
          <li key={todo.description}>
            <input type="checkbox" checked={todo.done} readOnly />{" "}
            {todo.description}
          </li>
        ))}
      </ul>
    );
  }, [data, error]);

  return (
    <>
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className="description">Hosted on Azure Static Web Apps!</p>

        <div className="grid">
          <Link href="/admin">
            <span className="card">
              <h2>Admin Page &rarr;</h2>
              <p>Try access the protected route in this example!</p>
            </span>
          </Link>
        </div>

        <div className="todo-section">
          <h1>Todo List</h1>
          {todoSection}
        </div>
      </main>
    </>
  );
};

export default withAuthorization(Home);

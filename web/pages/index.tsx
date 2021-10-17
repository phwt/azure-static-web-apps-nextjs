import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useMemo } from "react";
import { fetcher } from "../modules/Utils";

const Home = () => {
  const { data, error } = useSWR("/api/TodoList", fetcher);

  const todoSection = useMemo(() => {
    if (error) return <div>Error fetching todo!</div>;
    if (!data) return <div>Loading...</div>;

    return (
      <ul className={styles["no-bullets"]}>
        {data.map((todo) => (
          <li>
            <input type="checkbox" checked={todo.done} /> {todo.description}
          </li>
        ))}
      </ul>
    );
  }, [data, error]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>Hosted on Azure Static Web Apps!</p>

        <div className={styles.grid}>
          <Link href="/admin">
            <span className={styles.card}>
              <h2>Admin Page &rarr;</h2>
              <p>Try access the protected route in this example!</p>
            </span>
          </Link>
        </div>

        <footer className={styles.footer}>
          <h1>Todo</h1>
          {todoSection}
        </footer>
      </main>
    </div>
  );
};

export default Home;

import withAuthorization from "../../containers/withAuthorization";
import { getStaticPropsAllowedRoles } from "../../modules/Auth";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";

export const getStaticProps = () => {
  return {
    props: {
      ...getStaticPropsAllowedRoles(__filename),
    },
  };
};

const AdminIndex = ({ user }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoResponse, setTodoResponse] = useState(
    "Press save and the response will appear here!"
  );

  useEffect(() => {
    (async () => {
      const response = await (await fetch("/api/TodoList")).json();
      setTodoList(response);
    })();
  }, []);

  const handleTodoSave = useCallback(async () => {
    const response = await fetch("/api/manage/TodoEdit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoList),
    });
    setTodoResponse(JSON.stringify(await response.json(), null, 2));
  }, [todoList]);

  const todoSection = useMemo(() => {
    if (!todoList) return <div>Loading...</div>;

    return (
      <>
        <ul className="no-bullets">
          {todoList.map((todo) => (
            <li key={todo.id}>
              <input
                id={todo.id}
                type="checkbox"
                checked={todo.done}
                onChange={({ target }) => {
                  setTodoList(
                    todoList.map((localTodo) => {
                      if (localTodo.id === todo.id)
                        return { ...localTodo, done: target.checked };
                      return localTodo;
                    })
                  );
                }}
              />{" "}
              <input
                type="text"
                value={todo.description}
                onChange={({ target }) => {
                  setTodoList(
                    todoList.map((localTodo) => {
                      if (localTodo.id === todo.id)
                        return { ...localTodo, description: target.value };
                      return localTodo;
                    })
                  );
                }}
                style={{
                  width: "20vw",
                }}
              />
            </li>
          ))}
          <li
            style={{
              marginTop: "1em",
              textAlign: "center",
              opacity: 0.65,
              cursor: "pointer",
            }}
            onClick={() => {
              setTodoList([
                ...todoList,
                {
                  id: todoList.length + 1,
                  description: "",
                  done: false,
                },
              ]);
            }}
          >
            + Add new item
          </li>
        </ul>
      </>
    );
  }, [todoList]);

  return (
    <>
      <Head>
        <title>Next.js on Azure | Admin</title>
      </Head>
      <h1>Manage Todo List</h1>
      {todoSection}
      <button
        type="button"
        style={{
          marginTop: "1rem",
        }}
        onClick={handleTodoSave}
      >
        Save
      </button>
      <pre>{todoResponse}</pre>

      <div
        style={{
          opacity: 0.75,
          textAlign: "center",
          fontSize: "0.75em",
        }}
      >
        (For demonstration purpose only) <br />
        This doesn't actually update the todo list on the home page
        <br /> because Azure Function is stateless and we have no database
      </div>

      <h4
        style={{
          marginTop: "3em",
          marginBottom: 0,
        }}
      >
        Current user:
      </h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

export default withAuthorization(AdminIndex);

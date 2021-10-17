import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface Todo {
  description: string;
  done: boolean;
}

const todoList: Todo[] = [
  {
    description: "Get excited for building Next.js on Azure Static Web Apps",
    done: true,
  },
  {
    description: "Checking out Azure Static Web Apps",
    done: false,
  },
];

const fetchTodoList: AzureFunction = async (
  context: Context,
  req: HttpRequest
): Promise<void> => {
  context.res = {
    body: todoList,
  };
};

export default fetchTodoList;

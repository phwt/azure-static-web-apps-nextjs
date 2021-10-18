import { AzureFunction, Context, HttpRequest } from "@azure/functions";

interface Todo {
  id: number;
  description: string;
  done: boolean;
}

const todoList: Todo[] = [
  {
    id: 1,
    description: "Get excited for building Next.js on Azure Static Web Apps",
    done: true,
  },
  {
    id: 2,
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

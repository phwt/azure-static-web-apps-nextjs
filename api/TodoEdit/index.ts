import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const todoEdit: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res = {
    body: {
      timestamp: new Date().toISOString(),
      updatedTodo: req.body,
    },
  };
};

export default todoEdit;

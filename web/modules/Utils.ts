export const fetcher = (url) => fetch(url).then((res) => res.json());

export const arrayIntersection = <T>(a: T[], b: T[]) =>
  a.filter((value) => b.includes(value));

export const arraysIntersection = <T>(arrays: T[][]) =>
  arrays.reduce((cur, acc) => arrayIntersection(cur, acc));

export const getCurrentPath = () => {
  const removeExtension = (path: string) =>
    path.substring(0, path.lastIndexOf(".")) || path;

  const addTrailingSlash = (path: string) =>
    path.endsWith("/") ? path : `${path}/`;

  const nextPath = "/.next/server/pages";
  const currentPath = __filename.substring(
    process.cwd().length + nextPath.length
  );

  return addTrailingSlash(removeExtension(currentPath));
};

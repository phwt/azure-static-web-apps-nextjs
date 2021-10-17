export const fetcher = (url) => fetch(url).then((res) => res.json());

export const arrayIntersection = <T>(a: T[], b: T[]) =>
  a.filter((value) => b.includes(value));

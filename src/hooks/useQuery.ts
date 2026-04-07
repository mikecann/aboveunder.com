import queryString from "query-string";
import { useLocation } from "react-router";

export function useQuery<T>(): T {
  const location = useLocation();
  return queryString.parse(location.search) as T;
}

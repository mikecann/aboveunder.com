import { useLocation } from "react-router";
import * as queryString from "query-string";

export function useQuery<T>(): T {
  const location = useLocation();
  return queryString.parse(location.search) as any;
}

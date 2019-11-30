import { useState, useEffect } from "react";
import { getDb } from "../lib/db";
import { IDB } from "../lib/types";

let cache: IDB | undefined = undefined;

export function useDb(): [IDB | undefined, boolean] {
  const [loading, setLoading] = useState(cache != undefined);
  const [db, setDb] = useState<IDB | undefined>(cache);

  useEffect(() => {
    getDb().then(db => {
      setDb(db);
      cache = db;
    });
  }, []);

  return [db, loading];
}

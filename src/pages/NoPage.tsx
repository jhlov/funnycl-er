import { getDatabase } from "firebase/database";

export const NoPage = () => {
  const db = getDatabase();

  return <div className="mt-3">잘못된 접근입니다.</div>;
};

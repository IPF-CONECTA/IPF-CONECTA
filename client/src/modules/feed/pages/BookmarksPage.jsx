import { useEffect, useState } from "react";

import { HomeNav } from "../../ui/components";
import { PostList } from "../posts/components/PostList";
import { RecomendedAccounts } from "../components/RecomendedAccounts";

export const BookmarksPage = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const fetchAccounts = async () => {
      const { data, statusCode, message } = await getAccounts();
      if (statusCode !== 200) {
        setError({ message, statusCode });
        return;
      }
      setAccounts(data);
    };
    fetchAccounts();
  }, []);

  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostList />
        <RecomendedAccounts error={error} accounts={accounts} />
      </main>
    </>
  );
};

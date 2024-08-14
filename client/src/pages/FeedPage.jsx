import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import RecomendedAccounts from "../components/RecomendedAccounts";
import { getPosts } from "../services/feedServices";
import { useNoti } from "../hooks/useNoti";
import { getAccounts } from "../services/feedServices";
import HomeNav from "../components/HomeNav";
import { set } from "react-hook-form";
export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState({ message: null, statusCode: null });
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, statusCode } = await getPosts();
      if (statusCode !== 200) {
        return;
      }
      setPosts(data);
    };
    const fetchAccounts = async () => {
      const { data, statusCode, message } = await getAccounts();
      if (statusCode !== 200) {
        setError({ message, statusCode });
        return;
      }
      setAccounts(data);
    };
    fetchAccounts();
    fetchPosts();
  }, []);

  return (
    <>
      <main className="d-flex justify-content-center w-100 ">
        <HomeNav />
        <PostList posts={posts} />
        <RecomendedAccounts error={error} accounts={accounts} />
      </main>
    </>
  );
};

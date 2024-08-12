import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import RecomendedAccounts from "../components/RecomendedAccounts";
import { getPosts } from "../services/feedServices";
import { useNoti } from "../hooks/useNoti";
import { getAccounts } from "../services/feedServices";
import HomeNav from "../components/HomeNav";
export const FeedPage = () => {
  const noti = useNoti();
  const [posts, setPosts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetching posts");
      const { data, statusCode } = await getPosts();
      if (statusCode !== 200) {
        console.log(statusCode);
        return;
      }
      setPosts(data);
    };
    const fetchAccounts = async () => {
      const { data, statusCode } = await getAccounts();
      if (statusCode !== 200) {
        noti("Error al obtener los posts", "error");
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
        <RecomendedAccounts accounts={accounts} />
      </main>
    </>
  );
};


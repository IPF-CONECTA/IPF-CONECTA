import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PostCard } from "../components/PostCard";

export const PostsContainer = ({ username, own, postsData }) => {
  console.log(postsData);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!postsData) return;
    const posts = postsData.rows?.slice(0, 3);
    setPosts(posts);
  }, [postsData]);

  return (
    (own || postsData?.rows?.length > 0) && (
      <div className="border-bottom">
        <div className="w-100 border-bottom" id="posts">
          <div className="p-2">
            <div className="d-flex justify-content-between mb-2 p-2">
              <span className="fw-bold fs-5">Publicaciones</span>
              {own && (
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={() => navigate("/inicio")}
                    className="btn w-100 d-flex p-0 align-items-center me-3 "
                  >
                    <span className="material-symbols-outlined text-dark-emphasis">
                      add
                    </span>
                  </button>
                  <button
                    className="btn d-flex p-0 align-items-center"
                    onClick={() => navigate("publicaciones")}
                  >
                    <span className="material-symbols-outlined text-dark-emphasis">
                      edit
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className="w-100">
              <ul className="list-group list-group-flush">
                {posts?.length >= 1 ? (
                  posts.map((post, index) => (
                    <PostCard
                      key={index}
                      post={post}
                      username={username}
                      profile={true}
                    />
                  ))
                ) : (
                  <li className="list-group-item">No hay publicaciones</li>
                )}
              </ul>
            </div>
          </div>
        </div>
        {postsData?.count > 3 && (
          <div className="d-flex justify-content-center my-3">
            <Link
              to="publicaciones"
              className="fw-semibold p-0 text-body-tertiary text-decoration-none"
            >
              Ver todas las publicaciones ({postsData.rows?.length})
            </Link>
          </div>
        )}
      </div>
    )
  );
  // );
};

import React, { useEffect, useState } from "react";
import { getPostsQ } from "../services/statsServices";

export const PostsQ = () => {
  const [postsQ, setPostsQ] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPostsQ();
        if (res.status !== 200) {
          return setPostsQ("Hubo un error");
        }
        setPostsQ(res.data);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column align-items-center p-2 border rounded-3 ">
      {loading ? (
        "cargando"
      ) : (
        <>
          <span className="fw-semibold fs-4">Publicaciones totales</span>
          <span className="fw-bold fs-2">{postsQ}</span>
        </>
      )}
    </div>
  );
};

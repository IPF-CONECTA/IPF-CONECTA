import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "../../../feed/posts/components/Post";

export const AllPostsContainer = ({
  username,
  own,
  postData,
  onPostSubmit,
}) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postData);
  }, [postData]);

  return (
    <div className="bg-body-tertiary w-100">
      <div className="p-4 d-flex flex-column ">
        <div className="d-flex justify-content-between mb-2">
          <div className="d-flex ">
            <button
              className="btn p-0 d-flex align-items-center me-2"
              type="button"
              onClick={() => navigate(`/perfil/${username}`)}
            >
              <span className="material-symbols-outlined">arrow_back_ios</span>
            </button>
            <span className="fs-5 fw-bold">Publicaciones</span>
          </div>
          {own && (
            <div className="d-flex">
              <button
                type="button"
                onClick={() => navigate("/inicio")}
                className="btn w-100 d-flex p-0 align-items-center"
              >
                <span className="material-symbols-outlined text-dark-emphasis">
                  add
                </span>
              </button>
            </div>
          )}
        </div>
        <div className="d-flex flex-column align-items-center w-100">
          {" "}
          <ul className="w-100">
            {posts.count >= 1 ? (
              posts.rows.map((post, index) => (
                <Post postData={post} key={index} />
              ))
            ) : own ? (
              <li className="list-group-item text-secondary">
                Publica tus logros u progresos, se verán en tu perfil y otras
                personas podran verlo desde la comunidad.
              </li>
            ) : (
              <li className="list-unstyled d-flex flex-column align-items-center">
                <img
                  width={400}
                  src="/img/404_experiences.png"
                  alt="not found image"
                />
                <span className="fs-5 fw-semibold text-secondary">
                  No se encontraron experiencias
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

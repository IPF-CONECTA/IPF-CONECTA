import React, { useEffect, useState } from "react";
import { getPosts, postSvc } from "../../services/feedServices";
import { useNoti } from "../../../../hooks/useNoti";
import { PostCard } from "./PostCard";
import styles from "../../../../../public/css/feed.module.css";

export const PostList = () => {
  const noti = useNoti();
  const [focused, setFocused] = useState(false);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);

  const maxLength = 255;
  const charactersLeft = maxLength - content.length;

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, statusCode } = await getPosts();
      if (statusCode !== 200) {
        return;
      }
      setPosts(data);
    };
    if (isSubmitting == false) {
      fetchPosts();
    }
  }, [isSubmitting]);

  const handleAttachmentSelect = (e) => {
    if (images.length > 4) {
      return noti("Solo puedes adjuntar 4 archivos", "warning");
    }
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.length == 0 || content.length > 200) return;
    setIsSubmitting(true);
    const status = await postSvc(content);
    if (status !== 201) {
      return noti("Hubo un error al publicar el post", "error");
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
    setContent("");
    setFocused(false);
  };
  return (
    <div className="w-50 vh-100 d-flex flex-column align-items-center">
      <div className={`w-100 d-flex  align-items-center flex-column mt-4`}>
        <form
          onSubmit={handleSubmit}
          className={` h-100 w-75 d-flex flex-column align-items-end border ${
            posts?.length > 0 ? "border-bottom-0" : "border-bottom"
          } p-2 ${styles.postForm}`}
          onFocus={() => {
            setFocused(true);
          }}
        >
          <textarea
            className={`m-0 pt-2 ps-1 border border-0 rounded  w-100 ${
              focused ? styles.formInputFocused : styles.formInput
            }`}
            maxlength="255"
            placeholder="Que estas pensando..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          {focused && (
            <span className={`${styles.smallText} text-secondary`}>
              {charactersLeft}
            </span>
          )}
          <div className=" w-100 d-flex justify-content-between  pt-2">
            <div className="d-flex">
              <label
                htmlFor="attachments"
                className="btn d-flex align-items-center h-100 me-1"
              >
                <span className="material-symbols-outlined fs-5">
                  attachment
                </span>
              </label>
              <input
                accept=".jpg,.jpeg,.png, .mp4"
                type="file"
                id="attachments"
                className="d-none"
                onChange={handleAttachmentSelect}
              />
              <button
                type="button"
                className="btn d-flex align-items-center h-100 me-1"
              >
                <span className="material-symbols-outlined fs-5">gif_box</span>
              </button>
              <button
                type="button"
                className="btn d-flex align-items-center h-100 me-1"
              >
                <span className="material-symbols-outlined fs-5">
                  location_on
                </span>
              </button>
              <button
                type="button"
                className="btn d-flex align-items-center h-100 me-1"
              >
                <span className="material-symbols-outlined fs-5">mood</span>
              </button>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary text-light px-3 py-0 h-100 fw-bold"
            >
              {isSubmitting ? (
                <>
                  <span className="sr-only">Publicar</span>
                  <span
                    className="spinner-border spinner-border-sm ms-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </>
              ) : (
                "Publicar"
              )}
            </button>
          </div>
          {images.length > 0 && (
            <div className="w-100 d-flex">
              {images.map((image, index) => (
                <React.Fragment key={index}>
                  <div className={`d-flex align-items-start`}>
                    <img
                      height={60}
                      crossOrigin="anonymous"
                      className="me-1 border rounded p-1"
                      src={URL.createObjectURL(image)}
                      alt={`Imagen ${index + 1}`}
                      onClick={() => {
                        openImage(image);
                      }}
                    />
                    <button
                      type="button"
                      className="btn p-0 d-flex align-items-center"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </form>
      </div>
      <div className="w-75 d-flex flex-column flex-grow-1 align-items-center border-end border-start">
        {posts?.length > 0 ? (
          <div className="w-100 border-top">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center pb-5">
            <span
              className="material-symbols-outlined border border-black text-black border-5 rounded"
              style={{ fontSize: "5rem" }}
            >
              manage_search
            </span>
            <span className="fs-5 mt-3 fw-semibold">
              No se encontraron publicaciones
            </span>
            <span className="text-secondary">
              Sigue a otras cuentas para empezar
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

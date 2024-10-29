import React, { useEffect, useRef, useState } from "react";
import { getPosts, postSvc } from "../../services/feedServices";
import { useNoti } from "../../../../hooks/useNoti";
import { Post } from "./Post";
import styles from "../../../../../public/css/feed.module.css";
import EmojiPicker from "emoji-picker-react";

export const PostList = () => {
  const noti = useNoti();
  const [focused, setFocused] = useState(false);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const maxLength = 255;
  const charactersLeft = maxLength - content.length;
  const containerRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fetchPosts = async (reset = false) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getPosts(reset ? 1 : page);
      console.log(res);
      console.log(page);
      if (reset) {
        setPosts(res.data);
        setPage(2);
      } else {
        if (res.data.length > 0) {
          setPage((prevPage) => prevPage + 1);
          setPosts((prevPosts) => [...prevPosts, ...res.data]);
        } else {
          setError("No hay mas posts para mostrar");
        }
      }
    } catch (error) {
      if (error.statusCode !== 200) {
        return setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
          fetchPosts();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const handleEmojiClick = (emojiObject) => {
    console.log(emojiObject.emoji);
    setContent((prevContent) => prevContent + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleAttachmentSelect = (e) => {
    if (images.length == 4) {
      return noti("Solo puedes adjuntar 4 archivos", "warning");
    }
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.length === 0 || content.length > 200) return;
    setIsSubmitting(true);
    const status = await postSvc(content, images);
    if (status !== 201) {
      setIsSubmitting(false);
      return noti("Hubo un error al publicar el post", "error");
    }
    setPosts([]);
    setContent("");
    setFocused(false);
    setImages([]);
    setIsSubmitting(false);
    setPage(1);
    fetchPosts(true);
  };
  return (
    <div
      className="w-50 vh-100 d-flex flex-column align-items-center"
      ref={containerRef}
    >
      <div className={`w-100 d-flex  align-items-center flex-column mt-2 `}>
        <form
          onSubmit={handleSubmit}
          className={` h-100 w-75 d-flex flex-column align-items-end border border-bottom p-2 ${styles.postForm}`}
          onFocus={() => {
            setFocused(true);
          }}
        >
          <textarea
            className={`m-0 pt-2 ps-1 border border-0 rounded  w-100 ${
              focused ? styles.formInputFocused : styles.formInput
            }`}
            maxLength="255"
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
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
          {showEmojiPicker && (
            <EmojiPicker
              emojiStyle="native"
              className="position-absolute"
              style={{ zIndex: 1000 }}
              onEmojiClick={handleEmojiClick}
            />
          )}
          {images.length > 0 && (
            <div className="w-100 d-flex">
              {images.map((image, index) => (
                <React.Fragment key={image.id}>
                  <div className={`d-flex align-items-start`}>
                    <img
                      height={60}
                      className="me-1 border rounded p-1"
                      src={URL.createObjectURL(image)}
                      alt={`Imagen ${index + 1}`}
                      onClick={() => {
                        openImage(image);
                      }}
                    />
                    <button
                      onClick={() => {
                        setImages((prevImages) =>
                          prevImages.filter((_, i) => i !== index)
                        );
                      }}
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
        {posts.map((post) => (
          <Post key={post.id} postData={post} details={false} />
        ))}
        {isLoading && (
          <div className="d-flex justify-content-center my-3">
            <span
              className="spinner-border"
              role="status"
              aria-hidden="true"
            ></span>
          </div>
        )}
        {error && (
          <div className="text-secondary text-center my-3">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

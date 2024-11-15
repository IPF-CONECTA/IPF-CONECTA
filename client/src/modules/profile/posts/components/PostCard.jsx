import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { postsServices } from "../services/postsServices";

import { getDateWithHour } from "../../../../helpers/getTime";

export const PostCard = ({ post, username, own }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card mb-3 pointer"
      onClick={() => navigate(`/${username}/post/${post?.id}`)}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={`${BASE_URL}/images/${post.profile.profilePic}`}
            alt={`${post.profile.names} ${post.profile.surnames}`}
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="d-flex">
            <p>{`${post.profile.names} ${post.profile.surnames}`} </p>
            <p className="text-muted"> Ha publicado esto</p>
          </div>
          <small className="text-muted ms-auto">
            {getDateWithHour(post.createdAt)}
          </small>
        </div>

        <p className="card-text mb-2">{post.content}</p>
        {post.attachments?.length > 0 && (
          <div className="mb-3 fs-1">
            {post.attachments.map((attachment, index) => {
              return (
                <img
                  key={index}
                  src={`${BASE_URL}/images/${attachment.url}`}
                  alt="attachment"
                  className="me-1 border rounded-3"
                  style={{ height: "85px" }}
                />
              );
            })}
          </div>
        )}

        <div className="d-flex gap-3">
          <div className="d-flex">
            <span
              className={`material-symbols-outlined me-1 ${
                post.liked ? "text-primary" : "text-dark"
              }`}
            >
              thumb_up
            </span>
            <span className="me-1">{post.likes.length}</span>
          </div>
          <div className="d-flex">
            <span className="material-symbols-outlined me-1">repeat</span>
            <span className="ms-1">{post.reposts.length}</span>
          </div>
          <div className="d-flex">
            <span className="material-symbols-outlined me-1">forum</span>
            <span className="ms-1">{post.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

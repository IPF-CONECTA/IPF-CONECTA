import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../constants/BASE_URL";
import { postsServices } from "../services/postsServices";

import { getDateWithHour } from "../../../../helpers/getTime";

export const PostCard = ({ post, username, profile = false }) => {
  const navigate = useNavigate();
  return (
    <li
      className="list-group-item card text-truncate"
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/${username}/post/${post?.id}`)}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <img
            src={`${BASE_URL}/images/${post.profile.profilePic}`}
            alt={`${post.profile.names} ${post.profile.surnames}`}
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <p>{`${post.profile.names} ${post.profile.surnames}`} </p>
          <span className="text-muted ms-auto">
            {getDateWithHour(post.createdAt)}
          </span>
        </div>

        <p className="card-text mb-2">
          {profile
            ? post.content.length > 70
              ? post.content.slice(0, 70)
              : post.content
            : post.content}
        </p>
        {post.attachments?.length > 0 && (
          <div className="mb-3 fs-1 d-flex" style={{ height: "100px" }}>
            {post.attachments.map((attachment, index) => {
              return attachment.docType.split("/")[0] == "video" ? (
                <video
                  style={{ height: "100%" }}
                  className="me-1 border rounded-3"
                >
                  <source
                    src={`${BASE_URL}/images/${attachment.url}`}
                    type={attachment.docType}
                  ></source>
                </video>
              ) : (
                <img
                  key={index}
                  src={`${BASE_URL}/images/${attachment.url}`}
                  alt="attachment"
                  style={{ height: "100%" }}
                  className="me-1 border rounded-3"
                />
              );
            })}
          </div>
        )}

        <div className="d-flex gap-3 fs-6">
          <div className="d-flex align-items-center">
            <span className={`material-symbols-outlined me-1 fs-5`}>
              thumb_up
            </span>
            <span className="me-1 ">{post.likes.length}</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-symbols-outlined me-1 fs-5">repeat</span>
            <span className="ms-1">{post.reposts.length}</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="material-symbols-outlined me-1 fs-5">
              chat_bubble
            </span>
            <span className="ms-1">{post.comments.length}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

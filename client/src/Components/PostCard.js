import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
import LikeButton from "./LikeButton";
import DeletePost from "./DeleteButton";
import "./CSS/PostCard.css";

function PostCard({post: { title, description, id, username, likeCount, commentCount, likes }}) {
  const { user } = useContext(AuthContext);
  // console.log(id);

  return (
    <div className="post-card-container">
      <div>
        <p>Username: {username}</p>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <a href={`/post/${id}`}>Go to Single Post Page</a>
      </div>
      <div>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <button as={Link} to={`/posts/${id}`}>
          <p>
            {" "}
            Comment Count:
            {commentCount}
          </p>
        </button>
        {user && user.username === username && <DeletePost postId={id}/>}
      </div>
    </div>
  );
}

export default PostCard;

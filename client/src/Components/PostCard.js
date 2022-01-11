import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/Auth";
import LikeButton from "./LikeButton";
import DeletePost from "./DeleteButton";
import "./CSS/PostCard.css";
// import gql from "graphql-tag";
// import { FETCH_POSTS_QUERY } from "./graphql";
// import { useMutation } from "@apollo/client";

function PostCard({post: { title, description, id, username, likeCount, commentCount, likes }}) {
  const { user } = useContext(AuthContext);
  // console.log(id);

  return (
    <div className="post-card-container">
      <div>
        <p>Username: {username}</p>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        {/* <button to={`/post/${id}`}></button> */}
        <a href={`/post/${id}`}>Got Single Post Page</a>
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

import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import "./CSS/Home.css";
import { AuthContext } from "../Context/Auth";
import PostForm from '../Components/PostForm'
import { FETCH_POSTS_QUERY } from './graphql'

function Home() {

  const { user } = useContext(AuthContext);

//   const {
//     loading,
//     data
//     // data: { getPosts: posts }
//   } = useQuery(FETCH_POSTS_QUERY);

const { loading, data } = useQuery(FETCH_POSTS_QUERY)

const { getPosts: posts } = {...data}


  return (
    <div>
      <h1 style={{ textAlignLast: "center" }}>All Posts</h1>
      <div className="home-container">
          {user && (
              <PostForm/>
          )}
        {loading ? (
          <h1>Loading posts...please wait</h1>
        ) : (
          // posts.map((post) => {
            posts && posts.map((post) => {
            return (
              <div key={post.id} className="post-container">
                <p>Title: {post.title}</p>
                <p>Description: {post.description}</p>
                <p>
                  Comments:{" "}
                  {post.comments.map((comment) => {
                    return <div key={comment.id}>{comment.body}</div>;
                  })}
                </p>
                <p>likeCount: {post.likeCount}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;

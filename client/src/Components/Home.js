import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../Context/Auth";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { FETCH_POSTS_QUERY } from "./graphql";
import "./CSS/Home.css";

function Home() {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const { getPosts: posts } = { ...data };

  return (
    <div className="home-container">
      <h1
      style={{textAlign: 'center'}}
      >All Posts</h1>

      <div className="form-post-container">
        {user && (
          <div className="create-div">
            <PostForm />
          </div>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <div className="post-container">
            {posts &&
              posts.map((post) => (
                <div key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

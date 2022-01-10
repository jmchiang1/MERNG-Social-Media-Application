import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import "./CSS/Home.css";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  if (data) {
    console.log(data);
  }

  return (
    <div>
        <h1 style={{textAlignLast: 'center'}}>All Posts</h1>
      <div className="home-container">
        {loading ? (
          <h1>Loading posts...please wait</h1>
        ) : (
          // posts.map((post) => {
          data.getPosts.map((post) => {
            return (
              <div key={post.id} className="post-container">
                <p>Title: {post.title}</p>
                <p>Description: {post.description}</p>
                <p>
                  Comments:{" "}
                  {post.comments.map((comment) => {
                    return <div key={comment.id} >{comment.body}</div>;
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

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      title
      description
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
      }
    }
  }
`;

export default Home;

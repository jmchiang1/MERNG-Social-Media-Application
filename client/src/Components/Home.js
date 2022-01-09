import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
//   if (data){
//       console.log(data);
//   }

  return (
    <div>
      <h1>All Posts</h1>
      {loading ? (
        <h1>Loading posts...please wait</h1>
      ) : (
        // posts.map((post) => {
        data.getPosts.map((post) => {
            return (
                <div>
                    <p>Title: {post.title}</p>
                    <p>Description: {post.description}</p>
                </div>
            )
        })
      )}
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

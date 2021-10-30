import React, { useRef, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState({});
  const userIdRef = useRef();
  const [on, setOn] = useState(false);

  const onClick = async () => {
    const id = userIdRef.current.value;
    setOn(!on);
    if (!on) {
      const resp = await axios.get(`http://localhost:8080/users/${id}/posts`);
      setPosts(resp.data);
    }
  };

  const postList = Object.values(posts).map((post) => {
    return (
      <div
        key={post._id}
        className="card"
        style={{ width: "30%", marginBottom: "1em" }}
      >
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.content}</p>
        </div>
      </div>
    );
  });
  return (
    <>
    <h3>Get Posts</h3>
      <input ref={userIdRef} />
      <button className="btn btn-success" onClick={onClick}>
        {on ? "Hide Posts" : "Get Posts"}
      </button>
      {on ? (
        <div className="d-flex flex-row flex-wrap justify-content-between">
          {postList}
        </div>
      ) : null}
    </>
  );
};

export default PostList;

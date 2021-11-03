import React, { useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState({});
  const [on, setOn] = useState(false);
  const [posts, setPosts] = useState({});

  const onClick = async () => {
    setOn(!on);
    if (!on) {
      const resp = await axios.get("http://localhost:8080/users");
      setUsers(resp.data);
    }
  };

  const click = async (id) => {
    const resp = await axios.get(`http://localhost:8080/users/${id}/posts`);
    setPosts(resp.data);
    console.log(id);
  };

  const userList = Object.values(users).map((user) => {
    return (
      <div
        key={user._id}
        className="card"
        style={{ width: "22%", marginBottom: "1em" }}
      >
        <div className="card-body">
          <h5 className="card-title">{user.username}</h5>
          <p className="card-text">{user.password}</p>
          <p className="card-text">{user._id}</p>
        </div>
        <button key={user._id} onClick={() => click(user._id)}>
          Show Posts
        </button>
        {Object.values(posts).map((post) => {
          if (user._id === post.userId) {
            return (
              <div key={post._id}>
                <h5>{post.title}</h5>
                <p>{post.content}</p>
                <hr/>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  });
  return (
    <>
      <h3>Get Users</h3>
      <button className="btn btn-success" onClick={onClick}>
        {on ? "Hide Users" : "Get Users"}
      </button>
      {on ? (
        <div className="d-flex flex-row flex-wrap justify-content-between">
          {userList}
        </div>
      ) : null}
    </>
  );
};

export default UserList;

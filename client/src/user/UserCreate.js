import React, { useRef, useState } from "react";
import axios from "axios";

const UserCreate = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const onClick = () => {
    setUsername(usernameRef.current.value);
    setPassword(passwordRef.current.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // prevent page reload

    await axios.post("http://localhost:8080/users", {
      username,
      password,
    });
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <h3>Create User</h3>
      <form onSubmit={onSubmit}>
        <div  className="form-group">
          <label>Username</label>
          <input ref={usernameRef} className="form-control"/>
          <label>Password</label>
          <input type="password" ref={passwordRef} className="form-control" />
          <button className="btn btn-info" onClick={onClick}>Create User</button>
        </div>
      </form>
      <hr/>
    </>
  );
};

export default UserCreate;

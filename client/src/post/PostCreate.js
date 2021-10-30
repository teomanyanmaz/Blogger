import React, { useRef, useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const userIdRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const onClick = () => {
    setUserId(userIdRef.current.value);
    setTitle(titleRef.current.value);
    setContent(contentRef.current.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:8080/users/${userId}/posts`, {
      title,
      content,
    });
    setUserId("");
    setTitle("");
    setContent("");
  };
  return (
      <>
      <hr/>
      <h3>Create Post</h3>
    <form onSubmit={onSubmit} >
      <div className="form-group">
        <label>Enter the id of the user who will create the post</label>
        <input ref={userIdRef} className="form-control" />
        <label>Post Title</label>
        <input ref={titleRef} className="form-control" />
        <label>Post Content</label>
        <input ref={contentRef}  className="form-control"/>
        <button className="btn btn-info" onClick={onClick}>Create Post</button>
      </div>
    </form>
    <hr/>
    </>
  );
};

export default PostCreate;

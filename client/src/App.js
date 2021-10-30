import React from "react"
import PostCreate from "./post/PostCreate";
import UserCreate from "./user/UserCreate";
import UserList from "./user/UserList";
import PostList from "./post/PostList";

const App = () => {
    return(
        <>
        <UserCreate />
        <UserList />
        <PostCreate />
        <PostList />
        </>
    )
}

export default App;
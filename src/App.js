import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const url = "https://jsonplaceholder.typicode.com/users";
  
  useEffect(() => {
    setUsers([]);
    const abortController = new AbortController();
    const originalTitle = document.title;

    async function loadUsers() {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted loading users from API:", error);
        } else {
          throw error;
        }
      }
    }

    loadUsers();
    document.title = "Awesome Album App";
    return () => {
      document.title = originalTitle;
      abortController.abort()};
  },[]);

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} />
      </div>
    </div>
  );
}

export default App;

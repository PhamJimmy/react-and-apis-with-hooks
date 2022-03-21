import React, { useState, useEffect } from "react";

function AlbumList({ user={} }) {
  const [albums, setAlbums] = useState([]);
  
  useEffect(() => {
    setAlbums([]);
    const abortController = new AbortController();
    const url = `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`;

    async function loadAlbums() {
      try {
        if (user.id) {
          const response = await fetch(url, { signal: abortController.signal });
          const data = await response.json();
          setAlbums(data);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log(`Aborted getting album list of ${user.name}`);
        } else {
          throw ("album list error: ", error);
        }
      }
    }
    

    loadAlbums();
    return () => {
      console.log(user.id)
      abortController.abort();
    }
  }, [user]);

  return user.id ? (
    <div>
      <h1>{user.name} Albums</h1>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id}>{album.id} - {album.title}</li>
        ))}
      </ul>
    </div>
  ) : (
    <p>Please click on a user name to the left</p>
  );
}

export default AlbumList;

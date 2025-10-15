import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostThunk, fetchPostsThunk } from "../store/thunks/postsThunks";
import { addNotification } from "../store/slices/notificationsSlice";
import { addMessage } from "../store/slices/directMessagesSlice";

export const PostList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [text, setText] = useState("");

  //Cargar publicaciones al iniciar
  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  //Agregar publicación (Firestore + Redux)
  const handleAddPost = () => {
    if (text.trim() === "") return alert("Escribe algo para publicar");

    const userName = user?.displayName || "Anónimo";
    const date = new Date().toLocaleString();

    dispatch(addPostThunk(text, userName));

dispatch(addNotification({ text: `${userName} publicó: "${text}"`, time: new Date().toLocaleString() }));

dispatch(addMessage({ userName, text, timestamp: new Date() }));
    setText("");
  };

  return (
    <div className="card">
      <h2>Publicaciones</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe algo..."
        rows="3"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          background: "#0d1117",
          color: "#fff",
          border: "1px solid #30363d",
          resize: "none",
        }}
      ></textarea>

      <button onClick={handleAddPost}>Publicar</button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "15px" }}>
        {list.map((post) => (
          <li
            key={post.id}
            style={{
              background: "#161b22",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
              border: "1px solid #30363d",
            }}
          >
            <strong style={{ color: "#58a6ff" }}>{post.userName}</strong>
            <p style={{ margin: "5px 0" }}>{post.text}</p>
            <small style={{ color: "#aaa" }}>{post.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

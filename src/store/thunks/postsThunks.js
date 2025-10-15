import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { startLoading, setPosts, addPost, postsError } from "../slices/postsSlice";
import { addNotification } from "../slices/notificationsSlice";

const db = getFirestore();

// Agregar publicación + notificación
export const addPostThunk = (text, userName) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const newPost = { text, userName, date: new Date().toLocaleString() };
      const docRef = await addDoc(collection(db, "posts"), newPost);
      dispatch(addPost({ id: docRef.id, ...newPost }));

      const newNotification = {
        message: `${userName} ha realizado una nueva publicación`,
        userName: "UAOweb",
        read: false,
        date: new Date().toLocaleString(),
      };
      const notifRef = await addDoc(collection(db, "notifications"), newNotification);
      dispatch(addNotification({ id: notifRef.id, ...newNotification }));

    } catch (error) {
      console.error("Error al agregar publicación:", error);
      dispatch(postsError(error.message));
    }
  };
};

// ✅ Thunk para obtener todas las publicaciones
export const fetchPostsThunk = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const q = query(collection(db, "posts"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);

      const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      dispatch(setPosts(posts));
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
      dispatch(postsError(error.message));
    }
  };
};

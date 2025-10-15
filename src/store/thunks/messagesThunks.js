import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
  startLoading,
  setMessages,
  addMessage,
  messagesError,
} from "../slices/directMessagesSlice";

const db = getFirestore();

// ✅ Obtener todos los mensajes
export const fetchMessagesThunk = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const q = query(collection(db, "directmessagesqueues"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setMessages(messages));
    } catch (error) {
      dispatch(messagesError(error.message));
    }
  };
};

// ✅ Agregar mensaje a la cola y Firestore
export const addMessageThunk = (userName, text) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const newMessage = {
        userName,
        text,
        timestamp: new Date(),
      };

      const docRef = await addDoc(collection(db, "directmessagesqueues"), newMessage);

      dispatch(addMessage({ id: docRef.id, ...newMessage }));
    } catch (error) {
      dispatch(messagesError(error.message));
    }
  };
};

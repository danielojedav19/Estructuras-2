import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
  startLoading,
  setNotifications,
  addNotification,
  notificationsError,
} from "../slices/notificationsSlice";

const db = getFirestore();

// Agregar nueva notificación a Firestore y Redux
export const addNotificationThunk = (message, userName) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const newNotification = {
        message,
        userName,
        read: false,
        date: new Date().toLocaleString(),
      };

      const docRef = await addDoc(collection(db, "notifications"), newNotification);

      // Enviar a Redux con el id generado por Firestore
      dispatch(addNotification({ id: docRef.id, ...newNotification }));
    } catch (error) {
      console.error("Error al agregar notificación:", error);
      dispatch(notificationsError(error.message));
    }
  };
};

// Obtener todas las notificaciones desde Firestore
export const fetchNotificationsThunk = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const q = query(collection(db, "notifications"), orderBy("date", "desc")); // LIFO
      const querySnapshot = await getDocs(q);

      const notifications = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setNotifications(notifications));
    } catch (error) {
      console.error("Error al obtener notificaciones:", error);
      dispatch(notificationsError(error.message));
    }
  };
};

import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  startLoading,
  setItems,
  addItem,
  updateItem,
  deleteItem,
  firebaseError,
} from "../slices/firebaseSlice";

// Leer documentos
export const fetchItems = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const items = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      dispatch(setItems(items));
    } catch (error) {
      dispatch(firebaseError(error.message));
    }
  };
};

// Crear nuevo documento
export const addNewItem = (newData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const docRef = await addDoc(collection(db, "productos"), newData);
      dispatch(addItem({ id: docRef.id, ...newData }));
    } catch (error) {
      dispatch(firebaseError(error.message));
    }
  };
};

// Actualizar documento
export const updateItemFirebase = (id, newData) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const docRef = doc(db, "productos", id);
      await updateDoc(docRef, newData);
      dispatch(updateItem({ id, ...newData }));
    } catch (error) {
      dispatch(firebaseError(error.message));
    }
  };
};

// Eliminar documento
export const deleteItemFirebase = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await deleteDoc(doc(db, "productos", id));
      dispatch(deleteItem(id));
    } catch (error) {
      dispatch(firebaseError(error.message));
    }
  };
};

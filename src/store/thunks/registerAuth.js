import { createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import { auth } from "../../firebase/config";
import { startLoading, finishLoading, loginSuccess, logoutSuccess, authError,} from "../slices/authSlice";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore();

// Registrar con Email y Password
export const registerAuth = (email, password, name = "Usuario") => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: "",
      });

      // Guardar datos en Firestore
      await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        email,
        displayName: name,
      });

      await signOut(auth);
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (error) {
      dispatch(authError(error.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

// Login con Email y Password
export const loginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName } = response.user;

      dispatch(loginSuccess({ uid, email: userEmail, displayName }));
    } catch (error) {
      dispatch(authError(error.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

// Registro con Google
export const registerWithGoogle = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        alert("Ya existe un usuario con esta cuenta de Google. Inicia sesión.");
        await signOut(auth);
        return;
      }

      await setDoc(userDocRef, {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL || "",
      });

      await signOut(auth);
      alert(" Registro con Google exitoso. Ahora puedes iniciar sesión.");
    } catch (error) {
      dispatch(authError(error.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

// Login con Google
export const loginWithGoogle = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        alert("Tu cuenta Google no está registrada. Regístrate primero.");
        await signOut(auth);
        return;
      }

      dispatch(
        loginSuccess({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        })
      );
    } catch (error) {
      dispatch(authError(error.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

// Logout
export const logoutFirebase = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      await signOut(auth);
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(authError(error.message));
    } finally {
      dispatch(finishLoading());
    }
  };
};

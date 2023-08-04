import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export const setCardCount = async (
  setId,
  cardId,
  cardName,
  owner,
  cardAmount,
  setCount,
  count
) => {
  const ref = doc(db, "cardsets", setId, "ownerscards", owner);
  const docSnap = await getDoc(ref);
  if (!docSnap.exists()) {
    await setDoc(ref, {
      [cardId]: {
        cardName: cardName,
        cardAmount: 0,
      },
    });
    setCount(count + cardAmount);
  } else {
    await updateDoc(ref, {
      [`${cardId}.cardAmount`]: increment(cardAmount),
      [`${cardId}.cardName`]: cardName,
    });
    setCount(count + cardAmount);
  }
};

export const getCardData = async (setId, owner) => {
  try {
    const docRef = doc(db, "cardsets", setId, "ownerscards", owner);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log(`No such document for owner:${owner}`);
      return {};
    }
  } catch (e) {
    console.error("Error getting card: ", e);
    return {};
  }
};

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in");
  } catch (error) {
    console.log("Error signing in:", error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.log("Error signing out:", error);
  }
};

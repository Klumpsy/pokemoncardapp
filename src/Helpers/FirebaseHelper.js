import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
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
  rarity = "normal"
) => {
  const ref = doc(db, "cardsets", setId, "cards", cardId);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    await setDoc(ref, {
      cardName: cardName,
      owners: {
        [owner]: {
          rarities: {
            [rarity]: cardAmount,
          },
        },
      },
    });
  } else {
    const cardData = docSnap.data();
    const updateData = {
      ...cardData,
      owners: {
        ...cardData.owners,
        [owner]: {
          rarities: {
            ...((cardData.owners[owner] && cardData.owners[owner].rarities) ||
              {}),
            [rarity]:
              ((cardData.owners[owner] &&
                cardData.owners[owner].rarities[rarity]) ||
                0) + cardAmount,
          },
        },
      },
    };
    await updateDoc(ref, updateData);
  }
};

export const getCardData = async (setId, owner) => {
  const ref = collection(db, "cardsets", setId, "cards");

  try {
    const querySnapshot = await getDocs(ref);
    let cardsData = {};
    querySnapshot.forEach((doc) => {
      const card = doc.data();
      if (card.owners && card.owners[owner]) {
        cardsData[doc.id] = {
          cardName: card.cardName,
          owner: owner,
          rarities: card.owners[owner].rarities,
        };
      }
    });
    return cardsData;
  } catch (err) {
    console.error("Error getting card:", err);
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

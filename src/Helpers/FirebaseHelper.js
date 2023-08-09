import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  collection,
  deleteDoc,
  where,
  query,
  orderBy,
  limit,
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
  const ref = doc(db, "cards", cardId);
  const docSnap = await getDoc(ref);

  if (!docSnap.exists()) {
    await setDoc(ref, {
      setId: setId,
      cardName: cardName,
      owners: {
        [owner]: {
          rarities: {
            [rarity]: cardAmount,
          },
        },
      },
      lastAddedOn: Date.now(),
    });
  } else {
    const cardData = docSnap.data();
    // Update the existing document
    const updateData = {
      ...cardData,
      setId,
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
      lastAddedOn: Date.now(),
    };
    await updateDoc(ref, updateData);
  }
};

export const getCardData = async (setId, owner) => {
  const cardsCollectionRef = collection(db, "cards");
  const cardsQuery = query(cardsCollectionRef, where("setId", "==", setId));

  try {
    const querySnapshot = await getDocs(cardsQuery);
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

export const getLastAddedCards = async (number) => {
  const cardsRef = collection(db, "cards");
  const cardsQuery = query(
    cardsRef,
    orderBy("lastAddedOn", "desc"),
    limit(number)
  );

  let cardsData = [];

  try {
    const querySnapshot = await getDocs(cardsQuery);
    querySnapshot.forEach((doc) => {
      const card = doc.data();
      let ownersData = {};
      for (const owner in card.owners) {
        const rarities = card.owners[owner].rarities;
        // Check if any rarity value is 1 or more
        if (Object.values(rarities).some((value) => value >= 1)) {
          ownersData[owner] = { rarities };
        }
      }
      if (Object.keys(ownersData).length > 0) {
        cardsData.push({
          id: doc.id,
          cardName: card.cardName,
          owners: ownersData,
          lastAddedOn: card.lastAddedOn,
        });
      }
    });
    return cardsData;
  } catch (err) {
    console.error("Error getting cards:", err);
    return [];
  }
};

export const deletePsaGrade = async (cardId) => {
  try {
    const ref = doc(db, "psagraded", cardId);

    await deleteDoc(ref);
    console.log("Card deleted successfully.");
  } catch (err) {
    console.error("Error deleting card: ", err);
  }
};

export const createOrUpdatePsaGrade = async (
  setId,
  cardId,
  gradeData,
  owner
) => {
  try {
    const ref = doc(db, "psagraded", cardId);
    const data = {
      setId: setId,
      owner: owner,
      cardData: gradeData,
    };

    await setDoc(ref, data, { merge: true });
    console.log("Card created or updated successfully.");
  } catch (err) {
    console.error("Error creating or updating card: ", err);
  }
};

export const getAllGradedCards = async () => {
  try {
    const cards = [];
    const psagradedRef = collection(db, "psagraded");
    const snapshot = await getDocs(psagradedRef);

    snapshot.docs.forEach((doc) => cards.push({ id: doc.id, ...doc.data() }));

    cards.sort((a, b) => {
      const dateA = new Date(a.cardData.sendAt);
      const dateB = new Date(b.cardData.sendAt);
      return dateA - dateB;
    });
    return cards;
  } catch (err) {
    console.error("Error getting cards: ", err);
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

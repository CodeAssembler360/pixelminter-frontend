import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const bucket = "gs://pixeltrue-nft.appspot.com";

const firebaseConfig = {
  apiKey: "AIzaSyC-Qk-HpaIWD2qE24KW3HZQb0Kmgd5E8Bc",
  authDomain: "pixeltrue-nft.firebaseapp.com",
  projectId: "pixeltrue-nft",
  storageBucket: "gs://pixeltrue-nft.appspot.com",
  messagingSenderId: "524669663950",
  appId: "1:524669663950:web:e9d437be5751f6bf406e9f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const storage = firebase
  .app()
  .storage(process.env.FIREB_STORAGE_BUCKET || bucket);

export default firebase;

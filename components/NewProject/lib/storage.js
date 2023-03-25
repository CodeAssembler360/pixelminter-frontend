import uniqId from "uniqid";
import slugify from "slugify";

import { storage } from "firebase/firebaseClient";

export const uploadFromBlobAsync = async ({ blobUrl, name, address }) => {
  if (!blobUrl || !name) return null;

  try {
    const blob = await fetch(blobUrl).then((r) => r.blob());
    const snapshot = await storage
      .ref(`/source-images/${address}`)
      .child(slugify(uniqId() + " " + name.toLowerCase()))
      .put(blob);
    return await snapshot.ref.getDownloadURL();
  } catch (error) {
    throw error;
  }
};

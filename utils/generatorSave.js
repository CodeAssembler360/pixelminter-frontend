import JSZip from "jszip";
import uniqId from "uniqid";
import { storage } from "firebase/firebaseClient";

const save = async ({ address, items }) => {
  const zip = new JSZip();

  for (const item of items) {
    zip.file(
      `${items.indexOf(item) + 1}.jpg`,
      item.replace("data:image/png;base64,", ""),
      { base64: true }
    );
  }

  let dataURL = "";
  await zip.generateAsync({ type: "base64" }).then((base64) => {
    dataURL = "data:application/zip;base64," + base64;
  });

  const snapshot = await storage
    .ref("/")
    .child(uniqId() + ".zip")
    .putString(dataURL, "data_url");
  const downloadURL = await snapshot.ref.getDownloadURL();

  return downloadURL;
};

export default save;

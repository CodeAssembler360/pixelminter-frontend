const fs = require("fs");
global.XMLHttpRequest = require("xhr2");
import { createCanvas, loadImage } from "canvas";
import uniqId from "uniqid";

import firebase, { storage } from "firebase/firebaseClient";

// export const uploadAndGetURL = async ({ imageString, name, address }) => {
//   if (!imageString || !name) return null;

//   try {
//     const snapshot = await storage
//       .ref(`/generated-images/${address}`)
//       .child(name + uniqId() + ".jpg")
//       .putString(imageString);
//     return await snapshot.ref.getDownloadURL();
//   } catch (error) {
//     throw error;
//   }
// };

const sizes = {
  width: 500,
  height: 500,
};

const canvas = createCanvas(sizes.width, sizes.height);
const ctx = canvas.getContext("2d");

const saveImageAndUpload = async (canvas, address, projectID, index) => {
  const buffer = canvas.toBuffer("image/png");

  const snapshot = await storage
    .ref(`/projects/${address}/${projectID}`)
    .child(index + ".png")
    .put(buffer);
  return await snapshot.ref.getDownloadURL();
};

const countTotalItems = (items) => {
  const totalItemsByLayer = {};
  let totalUniqItems = 1;

  for (const { layerId } of items) {
    if (!totalItemsByLayer[layerId]) totalItemsByLayer[layerId] = 0;
    totalItemsByLayer[layerId] += 1;
  }

  Object.entries(totalItemsByLayer).forEach(([_key, value]) => {
    totalUniqItems = totalUniqItems * Number(value);
  });

  return totalUniqItems;
};

export const create = async ({ address, items, layers, projectID }) => {
  const totalCount = countTotalItems(items);

  const layersSortedByOrder = layers.sort((a, b) => a.order - b.order);
  const layersNames = layersSortedByOrder.map((x) => x.name);
  const layersIds = layersSortedByOrder.map((x) => x.id);
  const allArrays = [...Array(layersIds.length)];

  items.forEach((item) => {
    const layerIndex = layersIds.indexOf(item.layerId);
    const restItemsInArr = allArrays[layerIndex];
    allArrays[layerIndex] = restItemsInArr
      ? [...restItemsInArr, item.image]
      : [item.image];
  });

  const divisors = [];
  for (let i = allArrays.length - 1; i >= 0; i--) {
    divisors[i] = divisors[i + 1]
      ? divisors[i + 1] * allArrays[i + 1].length
      : 1;
  }

  function getPermutation(n) {
    const result = [];
    let curArray;

    for (let i = 0; i < allArrays.length; i++) {
      curArray = allArrays[i];
      result.push(curArray[Math.floor(n / divisors[i]) % curArray.length]);
    }

    return result;
  }

  const all = [];

  for (let i = 1; i <= totalCount; i++) {
    const set = getPermutation(i);
    ctx.clearRect(0, 0, sizes.width, sizes.height);

    for (const item of set) {
      const image = await loadImage(item);
      ctx.drawImage(image, 0, 0, sizes.width, sizes.height);
    }

    const newItemImageURL = await saveImageAndUpload(
      canvas,
      address,
      projectID,
      i
    );

    console.log("working on item ", i);

    all.push(newItemImageURL);
  }

  return all;
};

import { createCanvas, loadImage } from "canvas";

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

const create = async ({ items, layers, count }) => {
  console.log("COUNT", count);

  const sizes = {
    width: 500,
    height: 500,
  };

  const canvas = createCanvas(sizes.width, sizes.height);
  const ctx = canvas.getContext("2d");

  const startTime = performance.now();

  const totalMaximumCount = countTotalItems(items);
  const totalCount =
    count && count <= totalMaximumCount ? count : totalMaximumCount;
  // const totalCount = totalMaximumCount;

  const layersSortedByOrder = layers.sort((a, b) => a.order - b.order);
  // const layersNames = layersSortedByOrder.map((x) => x.name);
  const layersIds = layersSortedByOrder.map((x) => x.id); // ['background', 'outline', ...]
  const allArrays = [...Array(layersIds.length)]; // [1, 2, 3, 4]

  const randomizedItems = [...items].sort(() => (Math.random() > 0.5 ? 1 : -1));

  randomizedItems.forEach((item) => {
    const layerIndex = layersIds.indexOf(item.layerId);
    const restItemsInArr = allArrays[layerIndex];
    allArrays[layerIndex] = restItemsInArr ? [...restItemsInArr, item] : [item];
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

  let permutations = [];
  for (let i = 1; i <= totalMaximumCount; i++) {
    permutations.push(getPermutation(i));
  }

  permutations.sort(() => (Math.random() > 0.5 ? 1 : -1));

  const all = [];

  for (let i = 1; i <= totalCount; i++) {
    console.log(`working on item ${i}`);
    const set = permutations[i];
    ctx.clearRect(0, 0, sizes.width, sizes.height);
    for (const item of set) {
      const image = await loadImage(item.image);
      ctx.drawImage(image, 0, 0, sizes.width, sizes.height);
    }
    const newImageLocalURL = canvas.toDataURL("image/png");
    all.push(newImageLocalURL);
  }

  const endTime = performance.now();

  console.log(`Call to Create took ${(endTime - startTime) / 1000} seconds`);

  return all;
};

export default create;

import bubbleSort from "../algos/bubbleSort";
import mergeSort from "../algos/mergeSort";
import quickSort from "../algos/quickSort";
import selectionSort from "../algos/selectionSort";
import insertionSort from "../algos/insertionSort";

import cloneDeep from "lodash/cloneDeep";

//mapping between algorithm name derived from Menu Container and the associated sorting script.
// TODO replace placeholder bubbleSort with real sorts when ready
export const algoMap = {
  "Bubble Sort": bubbleSort,
  "Quick Sort": quickSort,
  "Merge Sort": mergeSort,
  "Selection Sort": selectionSort,
  "Insertion Sort": insertionSort
};

// Build an array of a given size; this array will mutate
const createUniqueArray = size => {
  const arr = [];
  for (let i = 1; i < size + 1; i++) {
    arr.push({ value: i, status: "idle", isSorted: false });
  }
  return arr;
};

// Shuffle the built array using Durstenfeld method
// Alternatively, could use _.js library's .shuffle() method
const shuffleArray = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const generateRandomArray = size => {
  return shuffleArray(createUniqueArray(size));
};

export const generateSteps = (name, size) => {
  return algoMap[name](size);
};

// make deep copy of array, and copy step along with status to steps. afterwards, this deeply cloned step is not needed.
//currently used in bubble sort and selection sort
export const addStep = (indices, array, steps, status) => {
  let step = cloneDeep(array);
  indices.forEach(i => (step[i].status = status));
  steps.push(step);
};

export const clearStatus = array => {
  return array.map(el => {
    return { ...el, status: "idle" };
  });
};

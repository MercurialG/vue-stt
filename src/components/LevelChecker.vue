<template>
  <div class="flex-row ml-80 w-1/2 mt-1 bg-slate-100 rounded-xl p-8 dark:bg-slate-700">
    <textarea
      v-model="sample"
      class="block mb-5 w-full p-5 text-center font-normal text-white bg-slate-800 bg-clip-padding rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      type="textarea"
      rows="5"
    />
    <button
      class="mb-2 ml-1 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
      @click="intersection = testStrings(sample, speech1)"
    >
      Compare
    </button>

    <div
      v-if="intersection.length != 0"
      class="text-center text-7xl text-white rounded bg-slate-800"
      title="Match:"
    >
      {{ "" + intersection.match.toFixed(2) + "%" }}
    </div>
    <div
      v-if="intersection.length != 0"
      class="p-2 pl-5 pr-5 mt-1 text-center text-red-500 text-2xl rounded bg-slate-800"
      title="Match:"
    >
      {{ intersection.diff.join(", ") }}
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { useSpeechStore } from "../store/speech";
// import testSrtings from "../checkStrings.js";
const speechStore = useSpeechStore();
const { speech, advancedWords } = storeToRefs(speechStore);
let speech1 = reactive(speech);
let sample =
  "The organic molecules were found in Mars's Gale Crater, a large area that may have been a watery lake over three billion years ago. The rover encountered traces of the molecule in rocks extracted from the area. The rocks also contain sulfur, which scientists speculate helped preserve the organics even when the rocks were exposed to the harsh radiation on the surface of the planet.";
let intersection = ref("");
// const testStrings = (...args) => {
//   const [wArr, test] = Array.from(args).map((s) =>
//     s
//       .toLowerCase()
//       .replace(/[^a-z\s]/g, "")
//       .split(" ")
//       .filter(Boolean)
//   );
//   const sumWeight = wArr.join("").length;
//   const wMap = wArr.reduce((acc, word) => {
//     if (!(word in acc)) {
//       acc[word] = {
//         count: 0,
//         weight: (100 / sumWeight) * word.length,
//       };
//     }
//     acc[word].count += 1;
//     return acc;
//   }, {});
//   return test.reduce((acc, word) => {
//     if (wMap[word]?.count) {
//       wMap[word].count--;
//       acc += wMap[word].weight;
//     }
//     return acc;
//   }, 0);
// };
const testStrings = (...args) => {
  const [wArr, test] = Array.from(args).map((s) =>
    s
      .toLowerCase()
      .replace(/[^a-z\s]/g, "")
      .split(" ")
      .filter(Boolean)
  );
  const sumWeight = wArr.join("").length;
  const wMap = wArr.reduce((acc, word) => {
    if (!(word in acc)) {
      acc[word] = {
        count: 0,
        seen: false,
        weight: (100 / sumWeight) * word.length,
      };
    }
    acc[word].count += 1;
    return acc;
  }, {});
  const diff = [];
  return {
    match: test.reduce((acc, word) => {
      if (wMap[word]?.count) {
        wMap[word].count--;
        wMap[word].seen = true;
        acc += wMap[word].weight;
      } else {
        diff.push(word);
      }
      return acc;
    }, 0),
    diff: diff.concat(
      Object.keys(wMap).filter((word) => {
        return !wMap[word].seen;
      })
    ),
  };
};

// let sampleArr = sample.split(" ")
// let speechArr = speech1.split(" ")
// function intersection() {
//    return sampleArr.filter(element => speechArr.includes(element))
//     }
</script>

<style></style>

<template>
  <div
    class="flex-row ml-80 w-1/2 mt-2 mb-2 bg-slate-100 rounded-xl p-8 dark:bg-slate-700"
  >
    <button
      class="mb-2 ml-1 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
      @click="intersection = testStrings(speech1, speech)"
    >
      Check vocabulary
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
      class="p-2 pl-5 pr-5 mt-1 text-center text-green-500 text-2xl rounded bg-slate-800"
      title="Match:"
    >
      {{ intersection.good.join(", ") }}
    </div>
    <div
      v-if="intersection.length != 0"
      class="p-2 pl-5 pr-5 mt-1 text-center text-red-500 text-2xl rounded bg-slate-800"
      title="Diff:"
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
let speech1 = advancedWords;
let intersection = ref("");
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
  const good = [];
  return {
    match: test.reduce((acc, word) => {
      if (wMap[word]?.count) {
        wMap[word].count--;
        wMap[word].seen = true;
        acc += wMap[word].weight;
        console.log(wMap.seen);
      }
      return acc;
    }, 0),
    diff: diff.concat(
      Object.keys(wMap).filter((word) => {
        return !wMap[word].seen;
      })
    ),
    good: good.concat(
      Object.keys(wMap).filter((word) => {
        return wMap[word].seen;
      })
    ),
  };
};
</script>

<style></style>

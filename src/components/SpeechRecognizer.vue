<template>
  <div class="flex-row ml-80 w-1/2 bg-slate-100 rounded-xl p-8 dark:bg-slate-700">
    <div class="p-2 pl-5 pr-5 text-white rounded bg-slate-800" title="Result:">
      {{ note }}
    </div>
    <div
      v-if="error"
      class="p-2 pl-5 pr-5 text-red-500 border-2 border-red-500 rounded bg-slate-800"
      title="Error:"
    >
      {{ error }}
    </div>
    <div
      class="p-2 pl-5 pr-5 text-blue-500 border-2 border-blue-500 rounded bg-slate-800"
      title="wc"
    >
      Words per minute: {{ speechStore.wordsPerMin }}
    </div>
    <hr class="bg-black mt-5" />
    <button
      class="mt-10 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
      @click="listen"
    >
      Start
    </button>
    <button
      class="mt-10 ml-1 p-2 pl-5 pr-5 bg-green-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
      @click="setSpeech()"
    >
      Stop and Confirm text
    </button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useSpeechStore } from "../store/speech";
import useSpeechRecognition from "../useSpeechRecognition";
import { storeToRefs } from "pinia";
name: "SpeechRecognizer";
const speechStore = useSpeechStore();
const { startListening, stopListening, note, error } = useSpeechRecognition();
let startTime;
let finishTime;
let wordsPerMin;
let wordCount = 0;
let speech = ref(note);

const listen = () => {
  startTime = performance.now();
  startListening();
};

const setSpeech = () => {
  speechStore.setSpeech(speech.value);
  wordCount = 0;
  finishTime = performance.now();
  let time = finishTime - startTime;
  let words = speech.value.split(" ");
  words.forEach((element) => {
    wordCount++;
  });
  wordsPerMin = ((wordCount / (time / 1000)) * 60).toFixed(2);
  speechStore.setWordsPerMin(wordsPerMin);
  console.log("words:" + wordCount, "time:" + time / 1000, wordsPerMin);

  stopListening();
};
</script>

<style></style>

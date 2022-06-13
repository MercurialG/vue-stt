import { defineStore } from "pinia";
export const useSpeechStore = defineStore("speech", {
  state: () => ({
    speech: "",
    advancedWords:
      "encountered speculate preserve harsh fool",
    parenthesis: "however hence firstly secondly therefore thus also though",
    wordsPerMin: 0
  }),
  actions: {
    setSpeech(note) {
      this.speech = note;
    },

    setWordsPerMin(words) {
      this.wordsPerMin = words;
    },
  },
  getters: {},
});

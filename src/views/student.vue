<template>
  <div class="student">
    <SpeechRecognizerVue />
    <LevelChecker />
    <VocabularyComparer />
  </div>
</template>

<script setup>
import SpeechRecognizerVue from "../components/SpeechRecognizer.vue";
import LevelChecker from "../components/LevelChecker.vue";
import VocabularyComparer from "../components/VocabularyComparer.vue";
</script>

<style>
/* .student {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
} */
</style>

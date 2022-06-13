import { watch, ref } from "vue";

var webkitSpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

export default function useSpeechRecognition() {
  
  
  const isListening = ref(false);
  const note = ref("The organic molecules were found in Mars's Gale Crater, a large  that may have been a watery  over three billion years ago. The rover encountered traces of the in rocks extracted from the area. The also contain sulfur, which scientists speculate helped preserve the organics even when the rocks were exposed to the harsh radiation on the surface of the planet.");
  const error = ref(null);

  
  const handleListen = () => {
    if (isListening.value) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  const startListening = () => {
    isListening.value = true
  }
  const stopListening = () => {
    isListening.value = false
  }
  const toggleListening = () => {
    isListening.value = !isListening.value;
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    note.value = transcript;
  };

  recognition.onerror = (event) => {
    error.value = event.error;
  };

  watch(isListening, () => {
    handleListen();
  });

  return {
    startListening,
    stopListening,
    toggleListening,
    note,
    error,
  };
}

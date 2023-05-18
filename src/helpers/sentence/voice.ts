const playAudio = (
  sentence: string,
  lang: string = "en-US",
  isRandom: boolean = true
) => {
  speechSynthesis.cancel();
  const ssu = new SpeechSynthesisUtterance(sentence);
  const voices = speechSynthesis.getVoices();
  const langVoice = voices.filter((v) => v.lang === lang);

  if (langVoice.length > 0) {
    ssu.voice =
      langVoice[!isRandom ? 0 : Math.floor(Math.random() * langVoice.length)];
  }

  speechSynthesis.speak(ssu);
};

export default playAudio;

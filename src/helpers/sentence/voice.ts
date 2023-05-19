const voiceEnables = [
  'com.apple.speech.synthesis.voice.Fred',
  'com.apple.eloquence.en-US.Rocko',
  'com.apple.eloquence.en-US.Shelley',
  'com.apple.speech.synthesis.voice.Princess',
  'com.apple.eloquence.en-US.Eddy',
  'com.apple.eloquence.en-US.Grandpa',
  'com.apple.speech.synthesis.voice.Kathy',
  'com.apple.eloquence.en-US.Reed',
  'com.apple.voice.compact.en-US.Samantha',
  'com.apple.eloquence.en-US.Sandy',
  'com.apple.speech.synthesis.voice.Junior',
  'com.apple.speech.synthesis.voice.Ralph',
  'Google US English',
  "Microsoft David - English (United States)",
  "Microsoft Mark - English (United States)",
  "Microsoft Zira - English (United States)",
  "Microsoft Aria Online (Natural) - English (United States)",
  "Microsoft Guy Online (Natural) - English (United States)",
]

const playAudio = (
  sentence: string,
  lang: string = "en-US",
  voiceURI?: string
) => {
  speechSynthesis.cancel();
  const ssu = new SpeechSynthesisUtterance(sentence);
  const voices = speechSynthesis.getVoices();

  if (voiceURI) {
    if (voiceEnables.includes(voiceURI)) {
      ssu.voice = voices.find(v => v.voiceURI === voiceURI) as SpeechSynthesisVoice | null
      speechSynthesis.speak(ssu);
    }
    return
  }

  const langVoice = voices.filter((v) => {
    return v.lang === lang && voiceEnables.includes(v.voiceURI)
  });

  if (langVoice.length === 0) {
    return
  }

  ssu.voice =
    langVoice[Math.floor(Math.random() * langVoice.length)];
    speechSynthesis.speak(ssu);
};

export default playAudio;

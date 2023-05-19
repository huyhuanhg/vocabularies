const convertType = (type?: string): string => {
  if (!type) {
    return "";
  }

  switch (type.toLowerCase()) {
    case "noun":
      return "n";
    case "verb":
      return "v";
    case "adverb":
      return "adv";
    case "adjective":
      return "adj";
    case "preposition":
    case "prep":
      return "pre";
    case "determiner pronoun":
    case "pronoun determiner":
      return "det";
    case "conjunction":
      return "con";
    case "modal verb":
      return "mv";
  }

  return type.toLowerCase();
};

export default convertType;

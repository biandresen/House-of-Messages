export function cleanAndCapitalize(sentence) {
  sentence = sentence.trim();
  return sentence ? sentence[0].toUpperCase() + sentence.slice(1) : "";
}

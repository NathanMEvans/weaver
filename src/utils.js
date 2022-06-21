// @flow

const MS_IN_HR = 3600 * 1000;
const MS_IN_DAY = 24 * MS_IN_HR;
const UTC_TO_EST = 5 * MS_IN_HR;

export function isAlphabetCharacter(character) {
  return character.length === 1 && character.match(/[a-z]/i);
}

export function getCharacterDiffCount(string1, string2) {
  let diffs = 0;
  string2.split('').forEach((character, index) => {
    if (character !== string1.charAt(index))
      diffs += 1;         
  });
  return diffs;
}

export function getNumDaysSinceEpoch() {
  return Math.floor((Date.now() - UTC_TO_EST) / MS_IN_DAY);
}

export function getDateStringFromDaysSinceEpoch(daysSinceEpoch) {
  const date = new Date((daysSinceEpoch + 1) * MS_IN_DAY);
  return date.toLocaleDateString();
}
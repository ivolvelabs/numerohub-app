// lib/numerologyUtils.js
import { numerologyInsightsData } from "@/data/numerologyInsights"; // Changed import path

/**
 * Reduces any number to its standard digital root (single digit 1-9).
 * Master numbers (11, 22, 33) are fully reduced in this specific function.
 *
 * @param {number} num The number to reduce.
 * @returns {number} The single-digit digital root.
 */
export const getDigitalRoot = (num) => {
  if (num > 0 && num < 10) return num;
  let sum = num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};

/**
 * Helper function to reduce a number to a single digit OR a recognized master number (11, 22, 33).
 *
 * @param {number} num The number to reduce.
 * @returns {number} The reduced number (single digit or a master number if applicable).
 */
export const reduceToMasterOrSingle = (num) => {
  let sum = num;
  while (sum > 9 && ![11, 22, 33].includes(sum)) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return sum;
};

/**
 * Calculates the Birth Number from a given day of birth.
 * @param {number} day The day of the month (e.g., 23).
 * @returns {number} The Birth Number.
 */
export const calculateBirthNumber = (day) => {
  return getDigitalRoot(day);
};

/**
 * Calculates the Life Path Number from a given date of birth (MM/DD/YYYY).
 * @param {string} dob A date string in 'YYYY-MM-DD' format.
 * @returns {number} The Life Path Number (1-9, 11, 22, or 33).
 */
export const calculateLifePathNumber = (dob) => {
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const reducedMonth = reduceToMasterOrSingle(month);
  const reducedDay = reduceToMasterOrSingle(day);
  const reducedYear = getDigitalRoot(year);

  let totalSum = reducedMonth + reducedDay + reducedYear;
  return reduceToMasterOrSingle(totalSum);
};

/**
 * Calculates the Compound Number for a given date of birth.
 * @param {string} dob A date string in 'YYYY-MM-DD' format.
 * @returns {number} The sum of individually reduced month, day, and year components.
 */
export const calculateCompoundNumber = (dob) => {
  const date = new Date(dob);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const reducedMonth = reduceToMasterOrSingle(month);
  const reducedDay = reduceToMasterOrSingle(day);
  const reducedYear = getDigitalRoot(year);

  return reducedMonth + reducedDay + reducedYear;
};

/**
 * Calculates the Universal Day Number based on the current date.
 * @returns {number} The Universal Day Number.
 */
export const calculateUniversalDayNumber = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const sum =
    getDigitalRoot(day) + getDigitalRoot(month) + getDigitalRoot(year);
  return getDigitalRoot(sum);
};

/**
 * Chaldean numerology chart for letter values.
 */
export const chaldeanChart = {
  A: 1,
  I: 1,
  J: 1,
  Q: 1,
  Y: 1,
  B: 2,
  K: 2,
  R: 2,
  C: 3,
  G: 3,
  L: 3,
  S: 3,
  D: 4,
  M: 4,
  T: 4,
  E: 5,
  H: 5,
  N: 5,
  X: 5,
  U: 6,
  V: 6,
  W: 6,
  O: 7,
  Z: 7,
  F: 8,
  P: 8,
};

/**
 * Calculates the numeric value of a given string (e.g., a name or part of a name).
 * @param {string} name The string to calculate the number for.
 * @param {boolean} retainMasterNumbers If true, 11 and 22 will be retained.
 * @returns {number} The calculated number.
 */
export const calculateNameValue = (name, retainMasterNumbers = true) => {
  let sum = 0;
  const cleanedName = name.toUpperCase().replace(/[^A-Z]/g, "");
  for (let i = 0; i < cleanedName.length; i++) {
    const letter = cleanedName[i];
    sum += chaldeanChart[letter] || 0;
  }
  return retainMasterNumbers
    ? reduceToMasterOrSingle(sum)
    : getDigitalRoot(sum);
};

/**
 * Calculates the Destiny Number from the full name at birth.
 * @param {string} fullName The full name given at birth.
 * @returns {number} The Destiny Number.
 */
export const calculateDestinyNumber = (fullName) => {
  return calculateNameValue(fullName, true);
};

/**
 * Calculates the Soul Number from the vowels in the full name at birth.
 * @param {string} fullName The full name given at birth.
 * @returns {number} The Soul Number.
 */
export const calculateSoulNumber = (fullName) => {
  const vowels = fullName.toUpperCase().replace(/[^AEIOU]/g, "");
  return calculateNameValue(vowels, true);
};

/**
 * Calculates the Personality Number from the consonants in the full name at birth.
 * @param {string} fullName The full name given at birth.
 * @returns {number} The Personality Number.
 */
export const calculatePersonalityNumber = (fullName) => {
  const consonants = fullName.toUpperCase().replace(/[AEIOU\s\W_]/g, "");
  return calculateNameValue(consonants, true);
};

/**
 * Calculates the Name Number (Expression Number) for a given name.
 * @param {string} name The name to calculate the number for.
 * @returns {number} The Name Number.
 */
export const calculateNameNumber = (name) => {
  return calculateNameValue(name, true);
};

/**
 * Generates a dynamic insight string based on a number, data category, and synonyms.
 *
 * @param {number} num The numerology number (e.g., Birth Number, Life Path Number).
 * @param {string} categoryKey The key in numerologyInsightsData (e.g., 'birthNumberInsights').
 * @returns {string} A dynamically generated insight.
 */
export const generateInsight = (num, categoryKey) => {
  const categoryData = numerologyInsightsData[categoryKey];
  const insightEntry = categoryData.find((entry) => entry.number === num);

  if (!insightEntry) {
    return `No specific insights found for ${categoryKey} number ${num}.`;
  }

  if (
    insightEntry.personalizedExplanationTemplates &&
    insightEntry.personalizedExplanationTemplates.length > 0
  ) {
    let generatedText =
      insightEntry.personalizedExplanationTemplates[
        Math.floor(
          Math.random() * insightEntry.personalizedExplanationTemplates.length
        )
      ];

    const allDynamicValues = {
      ...numerologyInsightsData.synonym_data,
      ...(insightEntry.luckyAttributes?.colors && {
        lucky_color: insightEntry.luckyAttributes.colors,
      }),
      ...(insightEntry.luckyAttributes?.affirmations && {
        affirmation: insightEntry.luckyAttributes.affirmations,
      }),
    };

    const placeholdersInText = generatedText.match(/\[([a-zA-Z_]+)\]/g);

    if (placeholdersInText) {
      placeholdersInText.forEach((placeholderMatch) => {
        const placeholderKey = placeholderMatch.replace(/[\[\]]/g, "");
        const possibleValues = allDynamicValues[placeholderKey];

        if (
          possibleValues &&
          Array.isArray(possibleValues) &&
          possibleValues.length > 0
        ) {
          generatedText = generatedText.replace(
            new RegExp(
              placeholderMatch.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            possibleValues[Math.floor(Math.random() * possibleValues.length)]
          );
        } else {
          console.warn(
            `Missing or empty synonym data for placeholder: "${placeholderKey}" in category: "${categoryKey}" for number: ${num}. Original template: "${generatedText}"`
          );
          generatedText = generatedText.replace(
            new RegExp(
              placeholderMatch.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            `[${placeholderKey}]`
          );
        }
      });
    }
    return generatedText;
  }

  if (insightEntry.generalTraits && insightEntry.generalTraits.length > 0) {
    return insightEntry.generalTraits[
      Math.floor(Math.random() * insightEntry.generalTraits.length)
    ];
  }

  return `Further insights for ${categoryKey} number ${num} will be available soon!`;
};

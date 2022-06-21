// @flow

import {getCurrentWordPair} from './wordPairs4.js';

export function logEventWithWordsLabel(event) {
  const [startWord, endWord] = getCurrentWordPair();
  if (window.gtag) {
      window.gtag("event", event, {
      event_category: 'general',
      event_label: startWord + ':' + endWord,
      value: 1,
    });
  }
}

export function logEventWithCustomLabel(event, label) {
  if (window.gtag) {
      window.gtag("event", event, {
      event_category: 'general',
      event_label: label,
      value: 1,
    });
  }
}
/**
@param{string} text
@return{string}
*/
export function reverseWords(text) {
  const reversed = new Array(text.length);

  for (let i = 0; i < text.length; ++i) {
    if (!isPrintable(text.codePointAt(i))) {
      reversed[i] = text.charAt(i);
      continue;
    }

    let start = i;
    while (i < reversed.length && isPrintable(text.codePointAt(i))) {
      ++i;
    }
    --i;
    let end = i;

    while (start <= end) {
      reversed[start] = text.charAt(end);
      reversed[end] = text.charAt(start);
      ++start;
      --end;
    }
  }

  return reversed.join("");
}

/**
@param{string} text
@return{string}
*/
export function reverseSentence(text) {
  const reversed = new Array(text.length);
  let indexReversed = 0;

  for (let i = text.length - 1; i >= 0; --i) {
    /**
     reverse current group of non-printable characters 
     */
    if (!isPrintable(text.codePointAt(i))) {
      let end = i;
      while (i >= 0 && !isPrintable(text.codePointAt(i))) {
        --i;
      }
      ++i;
      let start = i;

      while (start <= end) {
        reversed[indexReversed] = text.charAt(start);
        ++start;
        ++indexReversed;
      }
      continue;
    }

    /**
    reverse current group of printable characters
    */
    let end = i;
    while (i >= 0 && isPrintable(text.codePointAt(i))) {
      --i;
    }
    ++i;
    let start = i;

    while (start <= end) {
      reversed[indexReversed] = text.charAt(start);
      ++start;
      ++indexReversed;
    }
  }

  return reversed.join("");
}

/**
@param{number} charASCII
@return{boolean}
*/
function isPrintable(charASCII) {
  return charASCII > 32 && charASCII < 127;
}

const regex = new RegExp("\\s+", "g");
/**
@param{string} text
@return{string}
*/
export function clearSpace(text) {
  return text.replaceAll(regex, " ");
}

/**
@param{string} text
@return{void}
*/
export function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}

/**
Word is defined as any group of printable characters that contain at least one letter or digit. 
The method can be easily adjusted according to whatever definition of word is chosen.

Different text editors on the internet have different word definitions: 
some define it as any group of printable characters, others, 
such as https://wordcounter.net (as of April 2026), define word as any group of printable characters 
that has at least one letter or digit. The definition of the latter is chosen for this application.
*/
/**
@param{string} text
@return{number}
*/
export function findNumberOfWords(text) {
  let numberOfWords = 0;
  for (let i = 0; i < text.length; ++i) {
    let isWord = false;
    const isLetterOrDigit = /[a-z\d]/i;
    while (i < text.length && isPrintable(text.codePointAt(i))) {
      isWord |= isLetterOrDigit.test(text.charAt(i));
      ++i;
    }
    numberOfWords += isWord ? 1 : 0;
  }
  return numberOfWords;
}

import "../style/styles.css";
import { useState } from "react";
import { toLower, toUpper } from "lodash";
import {
  reverseWords,
  reverseSentence,
  clearSpace,
  copyToClipboard,
  findNumberOfWords,
} from "../utility/ProcessText";

const previousTextsIsEmpty = -1;

export default function TextConverter() {
  const [text, setText] = useState("");
  const [previousTexts, setPreviousTexts] = useState([]);
  const [indexPreviousTexts, setIndexPreviousTexts] =
    useState(previousTextsIsEmpty);

  const numberOfWords = findNumberOfWords(text);

  /**
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e
   * @returns {void}
   */
  function handleSetPreviousTexts(e) {
    if (!e.target.value) {
      return;
    }
    let newText = [
      ...previousTexts.slice(0, indexPreviousTexts + 1),
      e.target.value,
    ];
    setPreviousTexts(newText);
    setIndexPreviousTexts(indexPreviousTexts + 1);
  }

  /**
   * @returns {void}
   */
  function handleUndo() {
    const newText =
      indexPreviousTexts > 0 ? previousTexts[indexPreviousTexts - 1] : "";

    setText(newText);
    setIndexPreviousTexts(
      Math.max(indexPreviousTexts - 1, previousTextsIsEmpty),
    );
  }

  /**
   * @returns {void}
   */
  function handleRedo() {
    const newText =
      indexPreviousTexts < previousTexts.length - 1
        ? previousTexts[indexPreviousTexts + 1]
        : previousTexts[previousTexts.length - 1];

    setText(newText);
    setIndexPreviousTexts(
      Math.min(indexPreviousTexts + 1, previousTexts.length - 1),
    );
  }

  return (
    <div>
      <div className="dislpay-container">
        <span className="display">Number of Characters: {text.length}</span>
        <span className="display">
          Number of Words (min one letter or digit in a group): {numberOfWords}
        </span>
      </div>
      {/* field Textarea */}
      <textarea
        className="text-container"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          handleSetPreviousTexts(e);
        }}
      ></textarea>
      <div className="button-container">
        {/* button Upper Case */}
        <button
          className="button"
          onClick={() => {
            setText(toUpper(text));
            setPreviousTexts([...previousTexts, toUpper(text)]);
            setIndexPreviousTexts(indexPreviousTexts + 1);
          }}
        >
          Upper Case
        </button>
        {/* button Lower Case */}
        <button
          className="button"
          onClick={() => {
            setText(toLower(text));
            setPreviousTexts([...previousTexts, toLower(text)]);
            setIndexPreviousTexts(indexPreviousTexts + 1);
          }}
        >
          Lower Case
        </button>
        {/* button Clear All */}
        <button
          className="button"
          onClick={() => {
            setText("");
            setPreviousTexts([...previousTexts, ""]);
            setIndexPreviousTexts(indexPreviousTexts + 1);
          }}
        >
          Clear All
        </button>
        {/* button Copy to Clipboard */}
        <button className="button" onClick={() => copyToClipboard(text)}>
          Copy to Clipboard
        </button>
        {/* button Clear Space */}
        <button
          className="button"
          onClick={() => {
            setText(clearSpace(text));
            setPreviousTexts([...previousTexts, clearSpace(text)]);
            setIndexPreviousTexts(indexPreviousTexts + 1);
          }}
        >
          Clear Space
        </button>
        {/* button Reverse Characters within Each Character Group */}
        <button
          className="button"
          onClick={() => {
            setText(reverseWords(text));
            setPreviousTexts([...previousTexts, reverseWords(text)]);
            setIndexPreviousTexts(indexPreviousTexts + 1);
          }}
        >
          Reverse Characters within Each Character Group
        </button>
        {/* button Reverse Whole Text */}
        <button
          className="button"
          onClick={() => {
            setText(reverseSentence(text));
            setPreviousTexts([...previousTexts, reverseSentence(text)]);
            setIndexPreviousTexts(indexPreviousTexts + 1);
          }}
        >
          Reverse Whole Text
        </button>
        {/* button Undo */}
        <button className="button" onClick={handleUndo}>
          Undo
        </button>
        {/* button Redo */}
        <button className="button" onClick={handleRedo}>
          Redo
        </button>
      </div>
    </div>
  );
}

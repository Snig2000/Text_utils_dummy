import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";

export default function App() {
  const style = {
    marginLeft: "10px",
    marginRight: "10px",
  };

  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [exclamationCount, setExclamationCount] = useState(0);
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInputChange = (event) => {
    setText(event.target.value);
    //to count the number of words
    setWordCount(event.target.value.split(" ").length);
    //to count the number of characters
    setCharacterCount(event.target.value.length);
    //to count the number of sentences
    setSentenceCount(event.target.value.split(".").length - 1);
    // to count the number of questions
    setQuestionCount(event.target.value.split("?").length - 1);
    // to count the number of exclamations
    setExclamationCount(event.target.value.split("!").length - 1);
  };

  //convert into uppercase
  const handleUpperCase = () => {
    setText(text.toUpperCase());
    setShowToast1(true);
  };

  //convert into lowercase
  const handleLowerCase = () => {
    setText(text.toLowerCase());
    setShowToast2(true);
  };

  //convert to sentencecase
  const handleSentenceCase = () => {
    setText(
      text
        .split(".")
        .map((sentence) => sentence.trim().toLowerCase())
        .map((sentence) => sentence[0].toUpperCase() + sentence.slice(1))
        .join(".")
    );
  };
  //clear text input
  const handleClear = () => {
    setText("");
    setShowToast3(true);
  };

  //for toasts
  // const showToastAlert = () => {
  //   setShowToast(true);
  // };

  const handleToastClose = () => {
    setShowToast1(false);
    setShowToast2(false);
    setShowToast3(false);
  };

  //to toggle dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const theme = {
    light: {
      backgroundColor: "white",
      color: "black",
    },
    dark: {
      backgroundColor: "black",
      color: "white",
    },
  };
  const currentTheme = isDarkMode ? theme.dark : theme.light;

  return (
    <div style={currentTheme}>
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="mx-5 px-5 ">
        <h1 className="pt-5">Enter The Text To Analyze Below</h1>
        <div>
          <textarea
            className="form-control"
            id="myBox"
            rows="8"
            value={text}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="pt-5">
          <Button
            style={{ marginRight: "10px" }}
            variant="dark"
            onClick={handleUpperCase}
          >
            Convert to uppercase{" "}
          </Button>
          <Button style={style} variant="dark" onClick={handleLowerCase}>
            Convert to lowercase{" "}
          </Button>
          <Button style={style} variant="dark" onClick={handleSentenceCase}>
            Convert to sentencecase
          </Button>
          <Button style={style} variant="dark" onClick={handleClear}>
            Clear text{" "}
          </Button>
          <Toast
            onClose={handleToastClose}
            show={showToast1}
            delay={2000}
            autohide
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              backgroundColor: "#77DD77",
            }}
          >
            <Toast.Body>Success: Converted to uppercase!</Toast.Body>
          </Toast>
          <Toast
            onClose={handleToastClose}
            show={showToast2}
            delay={2000}
            autohide
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              backgroundColor: "#77DD77",
            }}
          >
            <Toast.Body>Success: Converted to lowercase!</Toast.Body>
          </Toast>
          <Toast
            onClose={handleToastClose}
            show={showToast3}
            delay={2000}
            autohide
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              backgroundColor: "#77DD77",
            }}
          >
            <Toast.Body>Text successfully cleared!</Toast.Body>
          </Toast>
        </div>
        <h1 className="pt-5">Your Text Summary</h1>
        <h6>
          {wordCount} words, {characterCount} characters, {sentenceCount}{" "}
          sentences, {questionCount} questions, {exclamationCount} exclamations.
        </h6>
        <h1 className="pt-2">Preview</h1>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
      </div>
  );
}

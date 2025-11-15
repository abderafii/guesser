import './App.css';
import wordlist from "wordlist-js";
import { useState } from "react";

export const length = 5;

export function Word(props) {
    const [disabled, setDisabled] = useState(false);
    const [colors, setColors] = useState(Array(length).fill("white"));
    const [word, setWord] = useState("");

    const handleChange = (e) => {
        e.target.value = e.target.value.toUpperCase();
        // skip to the next available spot
        const next = e.target.nextElementSibling;
        if (next) next.focus();
        // build the word in uppercase
        const inputs = Array.from(e.target.parentNode.querySelectorAll("input"));
        const newWord = inputs.map((input) => input.value.toUpperCase()).join("");
        setWord(newWord);
    };
    // function to check that the inputted word exists
    function checkExistence(word) {
        const englishWords = wordlist["englishAll"];
        const fiveLetterWords = englishWords.filter(word => word.length === length);
        if (fiveLetterWords.includes(word.toLowerCase())) return true;
    }
    // 
    const handleKeyDown = (e) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            e.target.value = "";
            const prev = e.target.previousElementSibling;
            if (prev) prev.focus();
        }
        else if (e.key === "Enter") {
            if (word === props.answer) {
                setColors(Array(length).fill("green"));
                setDisabled(true);
                alert("You found the word, Congrats!");
            }
            else if (word.length === length) {
                if (checkExistence(word)) {
                    console.log("Valid");
                    setDisabled(true);
                    const wordLetters = word.split("");
                    const answerLetters = props.answer.split("");
                    for (let i = 0; i < length; i++) {
                        let letterMatch = false;
                        for (let k = 0; k < length; k++) {
                            if (wordLetters[i] === answerLetters[k]) {
                                letterMatch = true;
                                if (i === k) {
                                    setColorAtIndex(i, "green");
                                    break;
                                } else {
                                    setColorAtIndex(i, "yellow");
                                }
                            }
                            if (!letterMatch) setColorAtIndex(i, "grey");
                        }
                    }
                }
                else alert("Word is not Valid");
            } else {
                alert("Word is not complete");
            }
        }
    };

    const setColorAtIndex = (index, color) => {
        setColors(prev => {
            const copy = [...prev];
            copy[index] = color;   // ⬅️ update specific index
            return copy;
        });
    };

    return (
        [...Array(length)].map((_, i) => (
            <input
                key={i}
                type="text"
                maxLength="1"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className='enabled'
                style={{
                    width: `${100 / length}%`,
                    height: "5em",
                    textAlign: "center",
                    backgroundColor: colors[i],
                    cursor: disabled ? "not-allowed" : "text"
                }}
            />
        ))
    );
}
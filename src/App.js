import './App.css';
import { useState, useEffect } from "react";
import {Word, length} from './Word';

function App() {
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetch("https://random-word-api.vercel.app/api?words=1&length=" + length)
      .then((res) => res.json())
      .then((data) => {
        setAnswer(data[0].toUpperCase());
        console.log(data);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
      });
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <Word answer={answer} />
      </div>
      <div className='row'>
        <Word answer={answer} />
      </div>
      <div className='row'>
        <Word answer={answer} />
      </div>
      <div className='row'>
        <Word answer={answer} />
      </div>
      <div className='row'>
        <Word answer={answer} />
      </div>
      <div className='row'>
        <Word answer={answer} />
      </div>
    </div>
  );
}

export default App;

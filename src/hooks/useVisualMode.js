import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition (newMode, replace = false) {
    if (replace) {
      console.log(true)
      const newHistory = history;
      newHistory.pop();
      newHistory.push(newMode);
      setHistory(newHistory)

      setMode(newMode);
    } else {
      history.push(newMode);
      setMode(newMode);
    }
  };

  function back () {
    if (history.length > 1) {
      const newHistory = history;
      newHistory.pop();
      setHistory(newHistory)

      const historyLength = history.length - 1;
      setMode(history[historyLength]);
    }
  };

  return { mode, transition, back, history }; 
}

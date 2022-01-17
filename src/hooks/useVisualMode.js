import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

 
  const transition = function(newMode, shouldReplace = false) {
    setMode(newMode);

    if (shouldReplace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    } else {
      setHistory(prev => [...prev, newMode]);
    }

  };

  /**
   * Go back to the previous mode.
   */
  const back = function() {
    // Can't go back if there isn't any history.
    if (history.length <= 1) {
      return;
    }
    setHistory(prev => {
      const newHistory = [...prev]
      newHistory.pop()
      return newHistory;
    });
    // Go back to the second last mode of the history
    setMode(prev => {
      console.log(history);
      return history[history.length - 2]
    });
    // Remove the last mode of history
    
  };

  return { mode, transition, back };
}
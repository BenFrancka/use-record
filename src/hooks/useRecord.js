import { useState, useEffect } from 'react';

export const useRecord = (initialValue) => {
  const [current, setCurrent] = useState(initialValue);
  const [historyArray, setHistoryArray] = useState([initialValue]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(historyArray.indexOf(current));
  }, [current]);

  //passes selected color value to history array
  const record = (selectedValue) => {
    setHistoryArray((previousArray) => [
      ...previousArray.slice(0, currentIndex + 1),
      selectedValue,
      ...previousArray.slice(currentIndex + 1),
    ]);
    //sets selected color value as current
    setCurrent(selectedValue);
  };
  
  //moves current one index back in history array
  const undo = () => {
    setCurrent(historyArray[currentIndex - 1]);
  };
  
  //moves current one index forward in history array
  const redo = () => {
    setCurrent(historyArray[currentIndex + 1]);
  };

  return {
    current,
    currentIndex,
    historyArray,
    undo,
    redo,
    record,
  };
};

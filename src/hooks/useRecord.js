import { useState, useEffect } from 'react';

export const useRecord = (init) => {
  const [current, setCurrent] = useState(init);
  const [historyArray, setHistoryArray] = useState([init]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(historyArray.indexOf(current));
  }, [current]);

  const record = (selectedValue) => {
    setHistoryArray((previousArray) => [
      ...previousArray.slice(0, currentIndex + 1),
      selectedValue,
      ...previousArray.slice(currentIndex + 1),
    ]);

    setCurrent(selectedValue);
  };

  const undo = () => {
    setCurrent(historyArray[currentIndex - 1]);
  };

  const redo = () => {
    setCurrent(historyArray + 1);
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

import { useState, useEffect } from 'react';

export const useRecord = (init) => {
  const [current, setCurrent] = useState(init);
};

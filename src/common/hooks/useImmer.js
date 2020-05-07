import { useState } from 'react';
import produce from 'immer';

export default function useImmer(initialState) {
  const [state, setState] = useState(initialState);
  const updateState = (draftUpdaterFn) => {
    const updatedState = produce(state, draftUpdaterFn);
    setState(updatedState);
  };
  return [state, updateState];
}

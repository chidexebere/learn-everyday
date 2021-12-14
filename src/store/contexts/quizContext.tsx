import React, { createContext, useReducer, Dispatch } from 'react';
import { QuizActions } from '../actions';
import quizReducer from '../reducers/quizReducer';
import { initialState, QuizState } from '../state';

interface QuizContextProps {
  children: React.ReactNode;
}

export const QuizContext = createContext<{
  state: QuizState;
  dispatch: Dispatch<QuizActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const QuizContextProvider = ({ children }: QuizContextProps): JSX.Element => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;

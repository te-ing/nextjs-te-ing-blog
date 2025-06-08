'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type ContextType = {
  visibleCount: number;
  setVisibleCount: Dispatch<SetStateAction<number>>;
};

const PostContext = createContext<ContextType | undefined>(undefined);

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  return (
    <PostContext.Provider value={{ visibleCount, setVisibleCount }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostContextProvider');
  }
  return context;
};

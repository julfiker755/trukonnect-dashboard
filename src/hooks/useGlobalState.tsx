import { useState } from 'react';

type AnyState = Record<string, any>;
type StateUpdater<T extends AnyState> = <K extends keyof T>(key: K, value: T[K]) => void;

export function useGlobalState<T extends AnyState>(initialState: T): [T, StateUpdater<T>] {
  const [global, setGlobalState] = useState<T>(initialState);

  const setGlobal: StateUpdater<T> = (key, value) => {
    setGlobalState((prev) => ({ ...prev, [key]: value }));
  };

  return [global, setGlobal];
}

import { useState } from 'react';

type AnyState = Record<string, any>;
type StateUpdater<T extends AnyState> = <K extends keyof T>(
  key: K,
  value: T[K] | Partial<T[K]>
) => void;

export function useGlobalState<T extends AnyState>(initialState: T): [T, StateUpdater<T>] {
  const [state, setState] = useState<T>(initialState);

  const setGlobal: StateUpdater<T> = (key, value) => {
    setState((prev) => ({
      ...prev,
      [key]:
        typeof prev[key] === 'object' && prev[key] && typeof value === 'object' && value
          ? { ...prev[key], ...value }
          : value,
    }));
  };

  return [state, setGlobal];
}

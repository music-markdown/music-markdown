import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function useContainerDimensions(
  ref: MutableRefObject<any>,
  zoom: number,
) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    };

    if (ref?.current) {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, zoom]);

  return dimensions;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (value) {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        } else {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
}

interface RouterParams {
  repo: string;
  branch: string;
  path: string;
  mode: string;
}

export function useRouteParams() {
  return useParams<RouterParams>();
}
